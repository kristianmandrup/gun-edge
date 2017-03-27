import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  each
} from '../src/each'

test('each', async t => {
  // todo
})