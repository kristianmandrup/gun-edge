import Gun from 'gun/gun'

export function addSoul({
  chain
}) {
  chain.soul = function () {
    return Gun.node.soul(this)
  }
  return chain
}