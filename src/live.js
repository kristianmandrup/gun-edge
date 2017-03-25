import Gun from 'gun/gun'

export function live(node, cb, opt) {
  return node.on(function (val, field) {
    let v = Gun.obj.copy(val)
    if (v) {
      delete v._;
    }
    cb.call(this, v, field);
  }, opt);
}

export function addLive({
  chain
}) {
  chain.live = function (cb, opt) {
    return live(this, cb, opt)
  }

  return chain
}