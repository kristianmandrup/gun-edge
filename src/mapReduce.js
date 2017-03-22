import {
  events
} from './pubsub'

import './async/map'
import './live'


export function mapReduce(bucket, {
  tfield,
  tvalue
}, cb) {
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

  bucket.map().live(function (colorValue, field) {
    let newKey = tfield(field)
    let value = tvalue
    if (!visited[field]) {
      visited[field] = true
      visited[newKey] = true
      newProps[newKey] = value
    } else {
      if (!updated) {
        updated = true
        events.publish('doneVisit', newProps)
      }
    }
  })
}