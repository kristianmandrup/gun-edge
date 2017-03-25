import Gun from 'gun/gun'

export async function $value(node, opt) {
  return new Promise(function (resolve, reject) {
    node.value(resolve, opt)
  })
}

export async function $valueAt(node, at, opt, Gun) {
  let path = node.path(at)
  if (path) {
    return path.$value(opt, Gun)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

import {
  addValue
} from '../value'

export function $addValue({
  chain
}) {
  addValue({
    chain
  })

  chain.$value = async function (opt) {
    return await $value(this, opt)
  }

  chain.$valueAt = async function (opt) {
    return await $valueAt(this, opt)
  }

  return chain
}