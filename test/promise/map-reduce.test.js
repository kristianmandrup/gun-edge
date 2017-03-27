import Gun from 'gun/gun'
import test from 'ava'

Gun.chainAll = function (...funs) {
  funs.forEach(fun => fun(Gun.chain, Gun))
}

import {
  addValue
} from '../src/value'

import {
  $addAll
} from '../src/async'

Gun.chainAll(addValue, $addAll)

function reverse(str, val) {
  return str ? str.split('').reverse().join('') : str
}

// remove a color field
const noColor = (color) => {
  return (field, value) => {
    return field === color
  }
}

const gun = Gun();

test('$mapReduce async/await', async t => {
  async function handleResult(bucket) {
    // let violet = await bucket.$valueAt('violet')
    // let teloiv = await bucket.$valueAt('teloiv')
    let violet = await bucket.path('violet').$value()
    let teloiv = await bucket.path('teloiv').$value()

    let colors = await bucket.$value()
    console.log('colors::', colors)
    console.log('violet::', violet)
    console.log('teloiv::', teloiv)
    t.is(violet, 'done')
    t.is(teloiv, 'ready')
  }

  let cols = gun.get('colors')
  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  let cfields = await cols.$fields()
  console.log('color fields', cfields)

  let reducedCols = await cols.$mapReduce({
    logging: true,
    newField: reverse,
    newValue: 'ready',
    value: (v) => 'done',
    filters: [noColor('red'), noColor('green')]
  })

  await handleResult(reducedCols)
})