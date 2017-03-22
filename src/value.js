import Gun from 'gun/gun'

Gun.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.valueAsync = function (opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.value(resolve, opt)
  });
}