import Gun from 'gun/gun'

Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.valueAt = function (at, cb, opt) {
  return this.path(at).value(cb, opt)
}