export function* $map(node, operator = 'val', transform, opt) {
  yield new Promise(function (resolve, reject) {
    let mapped = node.map(transform, opt)[operator](v => v)
    resolve(mapped)
  });
}

export function $addMap({
  chain
}) {
  chain.$map = function* (operator = 'val', transform, opt) {
    yield $map(this, operator, transform, opt)
  }
  return chain
}