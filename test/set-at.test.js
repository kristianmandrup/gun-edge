import Gun from 'gun/gun'
import test from 'ava'
import chain from '../src'
chain(Gun)
const gun = Gun();

import {
  setAt
} from '../src/set'

test('setAt', async t => {
  let cols = gun.get('colors')
  cols.put({
    violet: true,
    red: true,
    green: false
  })

  let _path = 'violet'

  cols.setAt(_path, {
    light: true
  })

  // TODO
  // let color = await cols.$valueAt(_path)

  // t.is(color, true)
  // t.is(cols.paths()[0], _path)
})