import Gun from 'gun/gun'
import '../value'

Gun.chain.$fields = function () {
  var self = this
  return new Promise(function (resolve, reject) {
    self.value(v => resolve(Object.keys(v)))
  });
}