export function local  (node, data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return node.put(data, cb, opt)
}

export function addLocal(chain, Gun) {
  chain.local = function (data, cb, opt) {
    return local(this, data, cb, opt)
  }

  return chain
}