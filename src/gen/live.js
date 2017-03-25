export function* $live(node, {
  condition,
  opt
}) {
  let c = () => true
  condition = condition || c
  while (condition(node)) {
    yield new Promise(function (resolve, reject) {
      node.live(resolve, opt)
    })
  }
}

export function $addLive({
  chain
}) {
  chain.$live = function* ({
    condition,
    opt
  }) {
    yield $live(this, {
      condition,
      opt
    })
  }

  return chain
}