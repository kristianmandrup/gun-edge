'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.local = function (data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return this.put(data, cb, opt);
};

// var gun = new Gun().get('example')
// gun.path('data').local(private)
// gun.path('data').put(synchronized)
//# sourceMappingURL=local.js.map
