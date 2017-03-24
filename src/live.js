export function live(node, cb, opt, Gun) {
  return node.on(function (val, field) {
    let v = Gun.node.copy(val)
    if (v) {
      delete v._;
    }
    cb.call(this, v, field);
  }, opt);
}

export function addLive(chain, Gun) {
  chain.live = function (cb, opt) {
    return live(this, cb, opt, Gun)
  }

  return chain
}