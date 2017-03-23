import './live'
import './fields'

import Gun from 'gun/gun'

Gun.chain.mapReduce = function (opts, cb) {
  mapReduce(this, opts, cb)
}

export function mapReduce(bucket, {
  newField,
  newValue,
  value,
  filter,
  filters,
  iterator = 'val',
  processWhile,
  updateWhen,
  logging = false
}, cb, putCb, opt) {

  let oldProps = {}
  let newProps = {}
  let deleteFields = {}
  let visited = {}
  let updated = false
  let allFields = bucket.fields()
  let processedFields = 0

  function defaultProcessWhile({
    field,
    val
  }) {
    let reVisit = visited[field]
    let decision = !reVisit
    log('processWhile', reVisit, decision)
    return decision
  }

  function defaultUpdateWhen({
    field,
    val
  }) {
    let processedAll = (processedFields >= allFields.length)
    let visitedAll = allFields.every(f => visited[f])
    let decision = visitedAll && processedAll
    log('updateWhen', visitedAll, processedAll, decision)
    return decision
  }

  function logger(fun) {
    return function _log(...args) {
      if (logging)
        console.log(fun, ...args)
    }
  }

  const log = logger(iterator)

  processWhile = processWhile || defaultProcessWhile
  updateWhen = updateWhen || defaultUpdateWhen

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

  function updateBucket() {
    log('put', oldProps)
    bucket.put(oldProps, putCb, opt)
    log('put', newProps)
    bucket.put(newProps, putCb, opt)

    let deleteKeys = Object.keys(deleteFields)
    if (deleteKeys.length > 0) {
      log('DELETE', deleteKeys)
      for (let dkey of deleteKeys) {
        bucket.get(dkey).put(null, putCb, opt)
      }
    }

    if (cb) {
      cb(bucket)
      log('DONE')
    } else {
      throw Error('Missing callback', cb)
    }
  }

  log(allFields)

  processWhile = processWhile.bind(this)
  updateWhen = updateWhen.bind(this)

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
      val
    })
    log('doReduce', doReduce)

    if (doReduce) {
      log('reduce', {
        field,
        val,
        processedFields
      })
      if (delField) {
        deleteFields[field] = true
      } else {
        oldProps[field] = oldValue
        newProps[newKey] = newValue
      }
      visited[field] = true
      visited[newKey] = true
      processedFields++
    }
    let doUpdate = updateWhen({
      field,
      val
    })
    log('doUpdate', doUpdate, processedFields)
    if (doUpdate) {
      // on stopCondition
      if (!updated) {
        log('UPDATE BUCKET')
        updated = true
        updateBucket()
      } else {
        log('ignore update')
      }
    }
  })
}