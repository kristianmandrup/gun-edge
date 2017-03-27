import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  no
} from '../src/no'

test('no', async t => {
  // todo
})