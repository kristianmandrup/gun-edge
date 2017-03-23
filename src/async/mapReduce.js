import Gun from 'gun/gun'

Gun.chain.mapReduceAsync = function (options, cb, putCb, opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    if (cb) {
      self.mapReduce(options, resolve(cb()), putCb, opt)
    } else {
      self.mapReduce(options, resolve, putCb, opt)
    }
  });
}