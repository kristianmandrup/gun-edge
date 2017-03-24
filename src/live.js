export function live(node, cb, opt) {
  return node.on(function (val, field) {
    if (val) {
      delete val._;
    }
    cb.call(this, val, field);
  }, opt);
}

export function addLive(chain, Gun) {
  chain.live = function (cb, opt) {
    return live(this, cb, opt)
  }

  return chain
}