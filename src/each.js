export function each(node) {
  var each = node.map();
  return node.val.apply(each, arguments)
}