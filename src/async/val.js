import Gun from 'gun/gun'

Gun.chain.valAsync = function (cb, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    if (cb) {
      self.val(resolve(cb()), opt)
    } else {
      self.val(resolve, opt)
    }
  });
}