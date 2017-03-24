export function $on(node, opt) {
  return new Promise(function (resolve, reject) {
    node.on(resolve, opt)
  })
}

export function $addOn(chain) {
  chain.$on = async function (opt) {
    return await $on(this, opt)
  }

  return chain
}