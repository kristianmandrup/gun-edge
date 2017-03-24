export function value(node, cb, opt) {
  return node.val(function (val, field) {
    let v = node.copy(val)
    delete v._
    cb.call(this, v, field)
  }, opt);
}

export function valueAt(node, at, cb, opt) {
  let pathNode = node.path(at)
  if (pathNode) {
    return pathNode.value(cb, opt)
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
    return value(this, cb, opt)
  }

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt)
  }

  return chain
}