export function $map(node, transform, opt) {
  return new Promise(function (resolve, reject) {
    let mapped = node.map(transform, opt).value(v => v)
    resolve(mapped)
  });
}

export function $addMap(chain) {
  chain.$map = async function (transform, opt) {
    return await $map(this, transform, opt)
  }
  return chain
}