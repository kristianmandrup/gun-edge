export function* $on(node, {
  condition,
  opt
}) {
  let c = () => true
  condition = condition || c
  while (condition(node)) {
    yield new Promise(function (resolve, reject) {
      node.on(resolve, opt)
    })
  }
}

export function $addOn({
  chain
}) {
  chain.$on = function* ({
    condition,
    opt
  }) {
    yield $on(this, {
      condition,
      opt
    })
  }

  return chain
}