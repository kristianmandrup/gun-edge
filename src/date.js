import Gun from 'gun/gun'

Gun.chain.date = function (data) {
  if (Gun.fns.is(data)) {
    return this.val(function (val) {
      data.call(this, new Date(val));
    })
  }
  return this.put(data.getTime());
}