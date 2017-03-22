import Gun from 'gun/gun'

Gun.chain.local = function (data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return this.put(data, cb, opt)
}

// var gun = new Gun().get('example')
// gun.path('data').local(private)
// gun.path('data').put(synchronized)