import {
  events
} from './pubsub'

import './async/map'
import './live'


export function mapReduce(bucket, {
  tfield,
  tvalue
}, cb) {
  if (tvalue && typeof tvalue !== 'function') {
    tvalue = (v) => v
  }

  let newProps = {}
  let visited = {}
  let updated = false

  events.subscribe('doneVisit', function (newProps) {
    bucket.put(newProps)
    if (cb) {
      cb(bucket)
    }
    events.publish('doneUpdate', bucket)
  })

  bucket.map().live(function (val, field) {
    let newKey = tfield ? tfield(field) : field
    let newValue = tvalue ? tvalue(val) : val
    if (!visited[field]) {
      visited[field] = true
      visited[newKey] = true
      newProps[newKey] = newValue
    } else {
      if (!updated) {
        updated = true
        events.publish('doneVisit', newProps)
      }
    }
  })
}