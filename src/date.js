import Gun from 'gun/gun'

export function date(node, data) {
  if (Gun.fns.is(data)) {
    return node.val(function (val) {
      data.call(this, new Date(val));
    })
  }
  return node.put(data.getTime());
}

export function addDate({
  chain
}) {
  chain.date = function (data) {
    return date(node, data)
  }

  return chain
}