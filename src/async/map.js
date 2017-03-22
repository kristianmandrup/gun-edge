import Gun from 'gun/gun'

Gun.chain.mapAsync = function (transform, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    let mapped = self.map(transform, opt).value(v => v)
    resolve(mapped)
  });
}