export function value(node, cb, opt, Gun) {
  return node.val(function (val, field) {
    let v = Gun.node.copy(val)
    delete v._
    cb.call(this, v, field)
  }, opt);
}

export function valueAt(node, at, cb, opt, Gun) {
  let pathNode = node.path(at)
  if (pathNode) {
    value(pathNode, cb, opt, Gun)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

import {
  addCopy
} from '../copy'

export function addValue(chain, Gun) {
  addCopy(chain, Gun)

  chain.value = function (cb, opt) {
    return value(this, cb, opt, Gun)
  }

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt, Gun)
  }

  return chain
}