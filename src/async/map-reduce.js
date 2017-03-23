import Gun from 'gun/gun'
import '../map-reduce'

Gun.chain.$mapReduce = function (options, putCb, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.mapReduce(options, resolve, putCb, opt)
  })
}