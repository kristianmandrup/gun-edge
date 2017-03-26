export function $val(node, opt) {
  return new Promise(function (resolve, reject) {
    node.val(resolve, opt)
  })
}

export function $addVal({
  chain
}) {
  chain.$val = function (opt) {
    return $val(this, opt)
  }
  return chain
}