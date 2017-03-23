import Gun from 'gun/gun'

Gun.chain.$val = function (opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.val(resolve, opt)
  })
}