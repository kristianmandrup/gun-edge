import Gun from 'gun/gun'
import test from 'ava'

import '../src/value'
import '../src/async/val'

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

import '../src/async'

function reverse(str, val) {
  return str ? str.split('').reverse().join('') : str
}

import {
  mapReduce
} from '../src/mapReduce'

test('mapAsync pub/sub', async t => {
  async function cb(bucket) {
    let violet = await bucket.valueAtAsync('violet')
    console.log('colors::', await bucket.valueAsync())
    console.log('violet::', violet)
    t.is(violet, 'violet')
  }

  let cols = gun.get('colors')

  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  // remove a color field
  const noColor = (color) => {
    return (field, value) => {
      return field === color
    }
  }

  // mapReduce(cols, {
  //   tfield: reverse,
  //   newValue: 'ready',
  //   oldValue: (v) => 'done',
  //   filters: [noColor('red'), noColor('green')]
  // }, cb)

  cols.mapReduce({
    logging: true,
    newField: reverse,
    newValue: 'ready',
    value: (v) => 'done',
    filters: [noColor('red'), noColor('green')]
  }, cb)
})