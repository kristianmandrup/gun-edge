import Gun from 'gun/gun'

Gun.chain.$map = function (transform, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    let mapped = self.map(transform, opt).value(v => v)
    resolve(mapped)
  });
}