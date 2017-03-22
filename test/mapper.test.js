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

test('mapAsync', async t => {
  let cols = gun.get('colors')
  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  let newColors = {}
  cols.map().live(function (color, id) {
    console.log(color, id)
    newColors[id + '2'] = 'done'
  });

  cols.put(newColors)
  console.log('colors::', await cols.valueAsync())
  console.log('violet::', await cols.valueAt('violet'))
})

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

  let signalled = false

  function signalDone(data) {
    if (!signalled) {
      console.log('send:: signal done')
      events.publish('done', data)
      signalled = true
    }
  }

  let printed = false
  events.subscribe('done', async function (cols) {
    if (!printed) {
      console.log('printing...')
      printed = true
      console.log('colors::', await cols.valueAsync())
      console.log('violet::', await cols.valueAt('violet'))
      process.exit(1)
    }
  })

  let newColors = {}
  cols.map().live(function (color, id) {
    console.log(color, id)
    let newKey = reverse(id)
    let value = 'done'
    console.log('new', newKey, value)
    if (!newColors[newKey]) {
      console.log('update')
      newColors[newKey] = value
      cols.put({
        [newKey]: value
      })
    } else {
      console.log('signal done')
      signalDone(cols)
    }
  });
})