import Gun from 'gun/gun'

Gun.chain.fields = function () {
  var mp = this.map().val(v => v)
  var map = Object.values(mp._.map)
  return Object.values(map).map(v => v.at.field)
}