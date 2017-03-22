import './live'

const log = console.log

export function mapReduce(bucket, {
  tfield,
  tvalue,
  filter
}, cb) {
  let tvalueFun
  if (tvalue && typeof tvalue !== 'function') {
    tvalueFun = (v) => tvalue
  } else {
    tvalueFun = tvalue
  }

  let newProps = {}
  let deleteFields = {}
  let visited = {}
  let updated = false

  function updateBucket(newProps) {
    // log('newProps', newProps)
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

  bucket.map().live(function (val, field) {
    let newKey = tfield ? tfield(field) : field
    let newValue = tvalueFun ? tvalueFun(val) : val
    let delField = false
    if (filter(field, val)) {
      delField = field
    }
    if (!visited[field]) {
      if (delField) {
        deleteFields[delField] = true
      } else {
        visited[field] = true
        visited[newKey] = true
        newProps[newKey] = newValue
      }
    } else {
      if (!updated) {
        updated = true
        updateBucket(newProps)
      }
    }
  })
}