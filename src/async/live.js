export function $live(node, opt) {
  return new Promise(function (resolve, reject) {
    node.live(resolve, opt)
  })
}

export function $addLive({
  chain
}) {
  chain.$live = async function (opt) {
    return await $live(this, opt)
  }

  return chain
}