import './live'

const log = console.log



export function mapReduce(bucket, {
  tfield,
  newValue,
  oldValue,
  filter,
  filters
}, cb) {

  function ensureFun(tvalue) {
    if (tvalue && typeof tvalue !== 'function') {
      return (v) => tvalue
    } else {
      return tvalue
    }
  }

  let newValueFun = ensureFun(newValue)
  let oldValueFun = ensureFun(oldValue)

  let oldProps = {}
  let newProps = {}
  let deleteFields = {}

  function updateBucket() {
    bucket.put(oldProps)
    bucket.put(newProps)

    let deleteKeys = Object.keys(deleteFields)
    if (deleteKeys.length > 0) {
      for (let dkey of deleteKeys) {
        bucket.get(dkey).put(null)
      }
    }
    if (cb) {
      cb(bucket)
    }
  }

  let visited = {}
  let updated = false

  bucket.map().live(function (val, field) {
    let newKey = tfield ? tfield(field) : field
    let newValue = newValueFun ? newValueFun(val) : val
    let oldValue = oldValueFun ? oldValueFun(val) : val
    let delField = false

    if (filters) {
      delField = filters.reduce((filtered, filter) => {
        return !filtered ? filter(field, val) : filtered
      }, false)
    }

    if (filter && filter(field, val)) {
      delField = true
    }
    log('delField', field, delField)

    if (!visited[field]) {
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