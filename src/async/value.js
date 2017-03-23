import Gun from 'gun/gun'

Gun.chain.valueAsync = function (cb, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    if (cb) {
      self.value(resolve(cb()), opt)
    } else {
      self.value(resolve, opt)
    }
  });
}

Gun.chain.valueAtAsync = function (at, cb, opt) {
  var self = this
  return self.path(at).valueAsync(cb, opt)
}