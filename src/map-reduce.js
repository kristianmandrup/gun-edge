import './live'
import './value'
import './async'
import './fields'

import Gun from 'gun/gun'

Gun.chain.mapReduce = function (opts, cb) {
  mapReduce(this, opts, cb)
}

export function mapReduce(bucket, options = {}, cb, putCb, opt) {

  bucket.fields((allFields) => {
    console.log('allFields', allFields)
    options = Object.assign(options, {
      allFields
    })
    doMapReduce(bucket, options, cb, putCb, opt)
  })
}

function logger(fun, logging) {
  return function _log(...args) {
    if (logging)
      console.log(fun, ...args)
  }
}

function doMapReduce(bucket, {
  newField,
  newValue,
  value,
  filter,
  filters,
  allFields,
  iterator = 'val',
  processWhile,
  updateWhen,
  updateBucket,
  deleteFromBucket,
  done,
  logging = false
}, cb, putCb, opt) {

  let ctx = {
    oldProps: {},
    newProps: {},
    deleteFields: {},
    visited: {},
    updated: false,
    processedFields: 0,
    allFields
  }

  const log = logger(iterator, logging)

  log('ctx', ctx)

  function defaultProcessWhile({
    field,
    val,
    ctx
  }) {
    let reVisit = ctx.visited[field]
    let decision = !reVisit
    log('processWhile', reVisit, decision)
    return decision
  }

  function defaultUpdateWhen({
    field,
    val,
    ctx
  }) {
    let processedAll = (ctx.processedFields >= ctx.allFields.length)
    let visitedAll = ctx.allFields.every(f => ctx.visited[f])
    let decision = visitedAll && processedAll
    log('updateWhen', visitedAll, processedAll, decision)
    return decision
  }

  function defaultDeleteFromBucket(bucket, ctx) {
    let deleteKeys = Object.keys(ctx.deleteFields)
    if (deleteKeys.length > 0) {
      log('DELETE', deleteKeys)
      for (let dkey of deleteKeys) {
        bucket.get(dkey).put(null, putCb, opt)
      }
    }
  }

  function defaultUpdateBucket(bucket, ctx) {
    log('put', ctx.oldProps)
    bucket.put(ctx.oldProps, putCb, opt)
    log('put', ctx.newProps)
    bucket.put(ctx.newProps, putCb, opt)
  }

  function defaultDone(bucket, cb) {
    log('DONE')
    if (cb) {
      cb(bucket)
    } else {
      throw Error('Missing callback', cb)
    }
  }

  processWhile = processWhile || defaultProcessWhile
  updateWhen = updateWhen || defaultUpdateWhen
  updateBucket = updateBucket || defaultUpdateBucket
  deleteFromBucket = deleteFromBucket || defaultDeleteFromBucket
  done = done || defaultDone

  function ensureFun(fun) {
    if (fun && typeof fun !== 'function') {
      return (v) => fun
    } else {
      return fun
    }
  }

  let newFieldFun = ensureFun(newField)
  let newValueFun = ensureFun(newValue)
  let oldValueFun = ensureFun(value)

  log(allFields)

  // processWhile = processWhile.bind(this)
  // updateWhen = updateWhen.bind(this)

  bucket.map()[iterator](function (val, field) {
    log('iterate', {
      field,
      val
    })
    let newKey = newFieldFun ? newFieldFun(field, val) : field
    let newValue = newValueFun ? newValueFun(val, field) : val
    let oldValue = oldValueFun ? oldValueFun(val, field) : val
    let delField = false

    if (filters) {
      log('process filters', filters.length)
      delField = filters.reduce((filtered, filter) => {
        return !filtered ? filter(field, val) : filtered
      }, false)
    }

    if (filter && filter(field, val)) {
      delField = true
    }

    log({
      newKey,
      newValue,
      oldValue,
      delete: delField
    })

    let doReduce = processWhile({
      field,
      val,
      ctx
    })
    log('doReduce', doReduce)

    if (doReduce) {
      log('reduce', {
        field,
        val,
        processedFields: ctx.processedFields
      })
      if (delField) {
        ctx.deleteFields[field] = true
      } else {
        ctx.oldProps[field] = oldValue
        ctx.newProps[newKey] = newValue
      }
      ctx.visited[field] = true
      ctx.visited[newKey] = true
      ctx.processedFields++
    }
    let doUpdate = updateWhen({
      field,
      val,
      ctx
    })
    log('doUpdate', doUpdate, ctx.processedFields)
    if (doUpdate) {
      // on stopCondition
      if (!ctx.updated) {
        log('UPDATE BUCKET')
        ctx.updated = true
        updateBucket(bucket, ctx)
        deleteFromBucket(bucket, ctx)
        done(bucket, cb)
      } else {
        log('ignore update')
      }
    }
  })
}