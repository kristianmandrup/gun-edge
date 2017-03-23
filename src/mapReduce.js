import './live'

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
  iterator = 'live',
  stopCondition,
  logging = false
}, cb, putCb, opt) {

  let oldProps = {}
  let newProps = {}
  let deleteFields = {}
  let visited = {}
  let updated = false

  function defaultStopCondition({
    field,
    val
  }) {
    return !visited[field]
  }

  stopCondition = stopCondition || defaultStopCondition

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
    bucket.put(oldProps, putCb, opt)
    bucket.put(newProps, putCb, opt)

    let deleteKeys = Object.keys(deleteFields)
    if (deleteKeys.length > 0) {
      for (let dkey of deleteKeys) {
        bucket.get(dkey).put(null, putCb, opt)
      }
    }
    if (cb) {
      cb(bucket)
    }
  }

  function logger(fun) {
    return function _log(...args) {
      if (logging)
        console.log(fun, ...args)
    }
  }

  const log = logger(iterator)
  var mp = bucket.map().val(v => v)
  var map = Object.values(mp._.map)

  let fields = Object.values(map).map(v => v.at.field)
  log(fields)

  bucket.map()[iterator](function (val, field) {
    let newKey = newFieldFun ? newFieldFun(field, val) : field
    let newValue = newValueFun ? newValueFun(val, field) : val
    let oldValue = oldValueFun ? oldValueFun(val, field) : val
    let delField = false

    log({
      newKey,
      newValue,
      oldValue
    })

    if (filters) {
      delField = filters.reduce((filtered, filter) => {
        return !filtered ? filter(field, val) : filtered
      }, false)
    }

    if (filter && filter(field, val)) {
      delField = true
    }

    log(delField)
    stopCondition = stopCondition.bind(this)

    if (stopCondition({
        field,
        val
      })) {
      if (delField) {
        deleteFields[field] = true
      } else {
        visited[field] = true
        visited[newKey] = true
        oldProps[field] = oldValue
        newProps[newKey] = newValue
      }
    } else {
      if (!updated) {
        updated = true
        updateBucket()
      }
    }
  })
}