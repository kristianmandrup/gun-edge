import Gun from 'gun/gun'

Gun.chain.$value = function (opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.value(resolve, opt)
  })
}

Gun.chain.$valueAt = function (at, opt) {
  let path = this.path(at)
  if (path) {
    return path.$value(opt)
  } else {
    throw new Error(`No such path ${at}`)
  }
}