export function each(node) {
  var each = node.map();
  return node.val.apply(each, arguments)
}

export function addEach({
  chain
}) {
  chain.each = function (cb, opt) {
    return each(this)
  }
  return chain
}