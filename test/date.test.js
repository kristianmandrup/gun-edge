import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  date
} from '../src/date'

test('date', async t => {
  // todo
})