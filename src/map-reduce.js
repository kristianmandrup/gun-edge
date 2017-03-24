export function addMapReduce(chain, Gun) {
  chain.mapReduce = function (opts, cb, putCb, opt) {
    mapReduce(this, opts, cb, putCb, opt)
  }
  return chain
}

export function mapReduce(bucket, options = {}, cb, putCb, opt) {
  bucket.fields((allFields) => {
    options = Object.assign(options, {
      allFields
    })
    doMapReduce(bucket, options, cb, putCb, opt)
  })
}

function defaultLogger(fun, logging) {
  return function (...args) {
    if (logging)
      console.log(fun, ...args)
  }
}

function doMapReduce(bucket, {
  newField,
  newValue,
  value,
  transform,
  filter,
  filters,
  fields = [],
  ignoreFields = [],
  allFields,
  iterator = 'val',
  validField,
  processWhile,
  updateWhen,
  updateBucket,
  filterBucket,
  saveChanges,
  done,
  logging = false,
  logger,
  context
}, cb, putCb, opt) {

  let ctx = {
    oldProps: {},
    newProps: {},
    filteredFields: {},
    visited: {},
    updated: false,
    processedFields: 0,
    allFields,
    fields,
    ignoreFields,
    iterator,
    context,
    putCb,
    opt
  }

  transform = transform || function (field, val) {
    return {}
  }

  logger = logger || defaultLogger

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

  function defaultValidField(field, ctx) {
    let {
      fields,
      ignoreFields
    } = ctx
    let valid = fields.length === 0 || fields.length > 0 && fields.indexOf(field) >= 0
    let invalid = ignoreFields.length > 0 && ignoreFields.indexOf(field) >= 0
    return valid && !invalid
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

  function defaultSaveChanges(bucket, changesObj, ctx) {
    bucket.put(changesObj, ctx.putCb, ctx.opt)
  }

  function defaultFilterBucket(bucket, ctx) {
    let deleteKeys = Object.keys(ctx.filteredFields)
    if (deleteKeys.length > 0) {
      log('FILTER', deleteKeys)
      let deleteObj = deleteKeys.reduce((obj, key) => {
        obj[key] = null
        return obj
      }, {})
      log('deleteObj', deleteObj)
      ctx.saveChanges(bucket, deleteObj, ctx)
    }
  }

  function defaultUpdateBucket(bucket, ctx) {
    log('UPDATE', props)
    let props = Object.assign(ctx.oldProps, ctx.newProps)
    ctx.saveChanges(bucket, props, ctx)
  }

  function defaultDone(bucket, cb, ctx) {
    log('DONE')
    if (cb) {
      cb(bucket, ctx)
    } else {
      throw Error(`${ctx.iterator}: missing callback (in done)`)
    }
  }

  validField = validField || defaultValidField
  processWhile = processWhile || defaultProcessWhile
  updateWhen = updateWhen || defaultUpdateWhen
  updateBucket = updateBucket || defaultUpdateBucket
  filterBucket = filterBucket || defaultFilterBucket
  saveChanges = saveChanges || defaultSaveChanges
  done = done || defaultDone

  ctx.saveChanges = saveChanges

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
    if (!validField(field, ctx)) return

    let newKey = newFieldFun ? newFieldFun(field, val, ctx) : field
    let newValue = newValueFun ? newValueFun(val, field, ctx) : val
    let newObj = transform(field, val, ctx)

    let oldValue = oldValueFun ? oldValueFun(val, field, ctx) : val
    let doFilter = false

    if (filters) {
      log('process filters', filters.length)
      doFilter = filters.reduce((filtered, filter) => {
        return !filtered ? filter(field, val, ctx) : filtered
      }, false)
    }

    if (filter && filter(field, val)) {
      doFilter = true
    }

    log({
      newKey,
      newValue,
      oldValue,
      doFilter
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
      if (doFilter) {
        ctx.filteredFields[field] = true
      } else {
        ctx.newProps = Object.assign(ctx.newProps, newObj)
        ctx.newProps[newKey] = newValue

        ctx.oldProps[field] = oldValue
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
      if (!ctx.updated) {
        log('UPDATE BUCKET')
        ctx.updated = true
        updateBucket(bucket, ctx)
        filterBucket(bucket, ctx)
        done(bucket, cb, ctx)
      } else {
        log('ignore update')
      }
    }
  })
}