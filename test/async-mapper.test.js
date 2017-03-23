import Gun from 'gun/gun'
import test from 'ava'

import '../src/value'
import '../src/async'

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
    let violet = await bucket.$valueAt('violet')
    console.log('colors::', await bucket.$value())
    console.log('violet::', violet)
    t.is(violet, true)
  }

  let cols = gun.get('_colors')

  let colors = cols.put({
    violet: true,
    red: true,
    green: false
  })

  let reducedCols = await cols.$mapReduce({
    logging: true,
    newField: reverse,
    newValue: 'ready',
    value: (v) => 'done',
    filters: [noColor('red'), noColor('green')]
  })
  handleResult(reducedCols)
})