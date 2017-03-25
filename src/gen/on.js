export function* $on(node, opt) {
  yield new Promise(function (resolve, reject) {
    node.on(resolve, opt)
  })
}

export function $addOn({
  chain
}) {
  chain.$on = function* (opt) {
    yield $on(this, opt)
  }

  return chain
}