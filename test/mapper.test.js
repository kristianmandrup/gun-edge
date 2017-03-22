import Gun from 'gun/gun'
import test from 'ava'

import '../src/value'
import '../src/async/val'
import '../src/async/map'
import '../src/live'

import {
  events
} from '../src/pubsub'

const gun = Gun();

// test('mapAsync', async t => {
//   let cols = gun.get('colors')
//   let colors = cols.put({
//     violet: true,
//     red: true,
//     green: false
//   })

//   let newColors = {}
//   cols.map().live(function (color, id) {
//     console.log(color, id)
//     newColors[id + '2'] = 'done'
//   });

//   cols.put(newColors)
//   console.log('colors::', await cols.valueAsync())
//   console.log('violet::', await cols.valueAt('violet'))
// })

test('mapAsync pub/sub', async t => {
  let cols = gun.get('colors')
  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  function reverse(str) {
    return str.split("").reverse().join("");
  }

  let newColors = {}
  let visited = {}
  let updated = false
  let printed = false

  events.subscribe('doneUpdate', async function (cols) {
    if (!printed) {
      console.log('printing...')
      printed = true
      let violet = await cols.valueAt('violet')
      console.log('colors::', await cols.valueAsync())
      console.log('violet::', violet)
      t.is(violet, 'violet')
    }
  })

  events.subscribe('doneVisit', function (newColors) {
    console.log('newColors', newColors, updated)
    cols.put(newColors)
    events.publish('doneUpdate', cols)
  })

  cols.map().live(function (colorValue, field) {
    let newKey = reverse(field)
    let value = 'done'
    if (!visited[field]) {
      visited[field] = true
      visited[newKey] = true
      console.log('update', newKey)
      newColors[newKey] = value
    } else {
      if (!updated) {
        updated = true
        console.log('signal done')
        events.publish('doneVisit', newColors)
      }
    }
  })
})