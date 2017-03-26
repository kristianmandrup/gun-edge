export function setAt(node, at, cb, opt) {
  let pathNode = node.path(at)
  if (pathNode) {
    pathNode.set(cb, opt)
  } else {
    throw new Error(`No such path ${at}`)
  }
}

export function addSet({
  chain
}) {
  chain.setAt = function (cb, opt) {
    return setAt(this, cb, opt)
  }
  return chain
}