import {
  iterate
} from '../iterate'

export function $iterate(node, opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign(opts, {
      cb: resolve
    })
    iterate(node, opts)
  })
}

export function $addIterate({
  chain
}) {
  chain.$iterate = async function (opts) {
    return await $iterate(this, opts)
  }
  return chain
}