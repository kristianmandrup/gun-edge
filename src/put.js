export function putAt(node, at, obj, cb, opt) {
  let pathNode = node.path(at)
  if (pathNode) {
    node._.paths = node._.paths || []
    pathNode.put(obj, cb, opt)
    node._.paths.push(at)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

export function addPut({
  chain
}) {
  chain.putAt = function (at, obj, cb, opt) {
    return putAt(this, at, obj, cb, opt)
  }

  chain.paths = function () {
    return this._.paths || []
  }

  return chain
}