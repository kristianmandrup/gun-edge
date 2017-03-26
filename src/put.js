export function putAt(node, at, cb, opt) {
  let pathNode = node.path(at)
  if (pathNode) {
    pathNode.put(cb, opt)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

export function addPut({
  chain
}) {
  chain.putAt = function (cb, opt) {
    return putAt(this, cb, opt)
  }
  return chain
}