import Gun from 'gun/gun'

// requires gun v0.5.9+
Gun.chain.no = function (cb) {
  var gun = this,
    chain = gun.chain(),
    flag;
  gun.not(function (a, b, c) {
    flag = true;
    if (!cb) {
      return
    }
    cb.call(this, a, b, c)
  });
  gun.get(function (at, ev) {
    if (flag) {
      return ev.off()
    }
    chain._.on('in', at);
  });
  return chain;
}