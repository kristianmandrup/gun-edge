export function* $map(node, {
  condition,
  transform,
  operator = 'val',
  opt
}) {
  let c = () => true
  condition = condition || c
  while (condition(node)) {
    yield new Promise(function (resolve, reject) {
      node.map(transform, opt)[operator](val => resolve(val))
    });
  }
}

export function $addMap({
  chain
}) {
  chain.$map = function* ({
    condition,
    operator = 'val',
    transform,
    opt
  }) {
    yield $map(this, {
      operator,
      condition,
      transform,
      opt
    })
  }
  return chain
}