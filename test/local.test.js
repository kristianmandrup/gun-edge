import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  local
} from '../src/local'

test('local', async t => {
  // todo
})