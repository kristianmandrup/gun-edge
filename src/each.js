import Gun from 'gun/gun'

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments)
}