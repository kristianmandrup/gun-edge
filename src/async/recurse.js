export function $recurse(node, filter) {
  return new Promise(function (resolve, reject) {
    node.recurse(resolve, filter)
  })
}

export function $addRecurse({
  chain
}) {
  chain.$recurse = async function (filter) {
    return await $recurse(this, filter)
  }
  return chain
}