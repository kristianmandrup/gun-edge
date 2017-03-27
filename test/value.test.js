import Gun from 'gun/gun'
import test from 'ava'
import chain from '../src'
chain(Gun)
const gun = Gun();

import {
  value
} from '../src/value'

test('value', async t => {
  // todo
})