import Gun from 'gun/gun'
import test from 'ava'
import chain from 'gun-edge'
chain(Gun)
const gun = Gun();

test('async iterator', async t => {
  let name = 'mark'
  let mark = gun.get('mark')

  function iterate(node, opts = {}) {
    let {
      cb,
      next,
      stopCondition,
      interval = 100,
      num = 0
    } = opts

    let defaultStop = (n) => {
      return n > 10
    }
    let defaultNext = (obj) => {}

    next = next || defaultNext
    stopCondition = stopCondition || defaultStop

    setTimeout(() => {
      let obj = Object.assign(next(num) || {}, {
        num
      })

      node.put(obj)
      num = num + 1
      if (stopCondition(num)) {
        cb(num)
      }

      let nextOpts = Object.assign(opts, {
        num
      })

      iterate(node, nextOpts)
    }, interval)
  }

  async function doLive(node) {
    return new Promise(function (resolve, reject) {
      iterate(mark, {
        cb: resolve
      })

      node.live((val) => {
        console.log(val)
      })
    })
  }

  await doLive(mark)
})