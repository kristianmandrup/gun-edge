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

function reverse(str) {
  return str.split("").reverse().join("");
}

import {
  mapReduce
} from '../src/mapReduce'

test('mapAsync pub/sub', async t => {
  let cols = gun.get('colors')

  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  async function cb(bucket) {
    let violet = await bucket.valueAt('violet')
    console.log('colors::', await bucket.valueAsync())
    console.log('violet::', violet)
    t.is(violet, 'violet')
  }

  // remove any green field
  const filter = (field, value) => {
    return field === 'green'
  }

  mapReduce(cols, {
    tfield: reverse,
    tvalue: 'done',
    filter
  }, cb)
})