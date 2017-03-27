import Gun from 'gun/gun'
import test from 'ava'

import {
  $csp
} from '../../src/channel/csp'

// import csp from 'js-csp'
const csp = require('js-csp')

import edge from '../../src'
edge(Gun)

const gun = Gun();
const log = console.log

// See Go Channels: http://swannodette.github.io/2013/08/24/es6-generators-and-csp

test('$csp', async t => {
  let cols = gun.get('colors')
  cols.put({
    violet: true,
    red: true,
    green: false
  })

  // https://github.com/zenparsing/zen-observable
  function doLive(node) {

    // TESTING basic CSP
    const ch = csp.chan();

    csp.takeAsync(ch, function (value) {
      return console.log("Got ", value);
    });

    // After the put, the pending take will happen
    csp.putAsync(ch, 42);
    //=> "Got 42"

    return new Promise(function (resolve, reject) {
      let maxNum = 4

      let size = 2
      let buffer = csp.buffers.fixed(size)
      // let buffer = csp.buffers.sliding(size)
      // let buffer = csp.buffers.dropping(size)

      // const promiseCh = csp.promiseChan();
      const promiseCh = csp.chan(buffer)

      let obs = $csp(node, promiseCh, {
        log: true,
        op: 'live'
      })

      node.timed({
        maxNum,
        logging: true,
        cb: resolve
      })

      let num = 0

      let handler = (vnode) => {
        console.log('TAKEN VALUE', vnode)
        if (vnode.num) {
          console.log('has num', vnode.num)
        }
      }

      let condition = () => num < 5

      // Please help improved this!!!
      csp.go(function* () {
        while (condition()) {
          yield csp.takeAsync(promiseCh, handler)
          console.log('num', num)
          num++
        }
      })
    })
  }

  await doLive(cols)
})