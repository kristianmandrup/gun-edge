export function copy(val, Gun) {
  return Gun.obj.copy(val)
}

export function addCopy(chain, Gun) {
  chain.copy = function (val) {
    return copy(val, Gun)
  }

  return chain
}