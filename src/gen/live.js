export function* $live(node, opt) {
  yield new Promise(function (resolve, reject) {
    node.live(resolve, opt)
  })
}

export function $addLive({
  chain
}) {
  chain.$live = function* (opt) {
    yield $live(this, opt)
  }

  return chain
}