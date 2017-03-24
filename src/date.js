export function date(node, data, Gun) {
  if (Gun.fns.is(data)) {
    return node.val(function (val) {
      data.call(this, new Date(val));
    })
  }
  return node.put(data.getTime());
}

export function addDate(chain, Gun) {
  chain.date = function (data) {
    return date(node, data, Gun)
  }

  return chain
}