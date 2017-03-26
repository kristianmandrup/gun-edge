import Gun from 'gun/gun'
import test from 'ava'

// import {
//   gen
// } from '../../src/gen'
// gen(Gun)

import {
  timed
} from '../../src/timed'

import {
  $on
} from '../../src/gen/on'

import edge from '../../src'
edge(Gun)

const gun = Gun();

test('async iterator', async t => {
  let cols = gun.get('colors')
  cols.put({
    violet: true,
    red: true,
    green: false
  })

  function iteratorOfPromisesForEach(iterator, callback) {
    let p = Promise.resolve()
    for (const i of iterator) {
      p = p.then(() => i).then(callback)
    }
    return p
  }

  function doLive(node) {
    return new Promise(function (resolve, reject) {
      timed(node, {
        logging: true,
        cb: resolve
      })

      iteratorOfPromisesForEach($on(node), (val) => {
        console.log('promised', val)
      })

      // setTimeout(x => {
      //   let iterator = $on(node)
      //   for (let x of iterator) {
      //     console.log('on', x)
      //   }
      // }, 300)

      // cols.live((val) => {
      //   console.log('live', val)
      // })
    })
  }

  await doLive(cols)
})