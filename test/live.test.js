import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  live
} from '../src/live'

test('live', async t => {
  // todo
})