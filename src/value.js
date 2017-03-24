import Gun from 'gun/gun'

// val = Gun.obj.copy(val); delete val._
Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    let v = Gun.obj.copy(val);
    delete v._;
    cb.call(this, v, field);
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