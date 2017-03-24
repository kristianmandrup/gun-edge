import Gun from 'gun/gun'
import test from 'ava'

import '../src/value'
import '../src/async'

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
} from '../src/map-reduce'

// remove a color field
const noColor = (color) => {
  return (field, value) => {
    return field === color
  }
}

test.cb('$mapReduce callback', t => {
  function handleResult(bucket, ctx) {
    function testRes() {
      bucket.value((reducedColors) => {
        console.log('colors::', reducedColors)
        let teloiv = reducedColors.teloiv
        console.log('teloiv::', teloiv)
        t.is(teloiv, 'ready')
        t.end()
      })
    }

    // Doesn't work :(
    setTimeout(testRes, 1000)
  }

  let cols = gun.get('colors')

  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  // let violet = await cols.$valueAt('violet')
  // console.log('violet before', violet)

  cols.mapReduce({
    logging: true,
    newField: reverse,
    newValue: 'ready',
    value: (v) => 'done',
    filters: [noColor('red'), noColor('green')]
  }, handleResult)
})