import Gun from 'gun/gun'
import test from 'ava'

import {
  $xstream
} from '../../src/observable/xstream'

import edge from '../../src'
edge(Gun)

const gun = Gun();
const log = console.log

test('$xstream', async t => {
  let cols = gun.get('colors')
  cols.put({
    violet: true,
    red: true,
    green: false
  })

  // https://github.com/zenparsing/zen-observable
  function doLive(node) {
    log(node)

    return new Promise(function (resolve, reject) {
      let obs = $xstream(node, {
        log: true
      })
      obs.addListener({
        next: (v) => log('listen', v)
      })

      let subscription = obs
        .subscribe({
          next: x => {
            log('sub', x)
            resolve()
          }
        })

      node.timed({
        maxNum: 2,
        logging: true,
        cb: resolve
      })
    })
  }

  await doLive(cols)
})