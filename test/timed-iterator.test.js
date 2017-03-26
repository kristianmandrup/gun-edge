import Gun from 'gun/gun'
import test from 'ava'
import chain from '../src'
chain(Gun)
const gun = Gun();

import {
  timed
} from '../src/timed'

test('timed iterator', async t => {
  let name = 'mark'
  let mark = gun.get('mark')

  function doLive(node) {
    return new Promise(function (resolve, reject) {
      timed(node, resolve)

      // Alternative pass options for fine control
      // iterate(node, {
      //   cb: resolve,
      //   num: 10
      // })

      node.live((val) => {
        console.log(val)
      })
    })
  }

  await doLive(mark)
})