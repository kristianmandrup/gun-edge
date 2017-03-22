import Gun from 'gun/gun'

Gun.chain.mapAsync = function (transform) {
  var self = this
  return new Promise(function (resolve, reject) {
    let mapped = self.map(transform).value(v => {
      console.log('v', v)
      return v
    })
    // resolve(self.map)
    resolve(mapped)
  });
}