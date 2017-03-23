import Gun from 'gun/gun'

Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.valueAt = function (at, cb, opt) {
  let node = this.path(at)
  if (node) {
    return node.value(cb, opt)
  } else {
    throw new Error(`No such path ${at}`)
  }
}