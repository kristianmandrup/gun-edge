import Gun from 'gun/gun'

export function value(node, cb, opt) {
  return node.val(function (val, field) {
    let v = Gun.obj.copy(val)
    delete v._
    cb.call(this, v, field)
  }, opt);
}

export function valueAt(node, at, cb, opt) {
  let pathNode = node.path(at)
  if (pathNode) {
    value(pathNode, cb, opt)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

export function addValue({
  chain
}) {
  chain.value = function (cb, opt) {
    return value(this, cb, opt)
  }

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt)
  }

  return chain
}