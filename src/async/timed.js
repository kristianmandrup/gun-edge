import {
  timed
} from '../timed'

export function $timed(node, opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign(opts, {
      cb: resolve
    })
    timed(node, opts)
  })
}

export function $addTimed({
  chain
}) {
  chain.$timed = async function (opts) {
    return await $timed(this, opts)
  }
  return chain
}