import Gun from 'gun/gun'

Gun.chain.localFields = function () {
  var mp = this.map().val(v => v)
  var map = Object.values(mp._.map)
  return Object.values(map).map(v => v.at.field)
}

Gun.chain.fields = function (cb, opt) {
  this.value(v => cb(Object.keys(v)))
}