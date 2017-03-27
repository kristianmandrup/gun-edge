import Gun from 'gun/gun'
import test from 'ava'

import edge from '../src'
edge(Gun)

const gun = Gun();

import {
  fields
} from '../src/fields'

test('fields', async t => {
  // todo
})