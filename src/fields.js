export function localFields(node) {
  var mp = node.map().val(v => v)
  var map = Object.values(mp._.map)
  return Object.values(map).map(v => v.at.field)
}

export function fields(node, cb, opt) {
  node.value(v => cb(Object.keys(v)))
}