export function $val(node, opt) {
  return new Promise(function (resolve, reject) {
    node.val(resolve, opt)
  })
}

export function $addVal(chain) {
  chain.$val = async function (opt) {
    return await $val(this, opt)
  }

  return chain
}