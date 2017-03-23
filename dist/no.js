'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// requires gun v0.5.9+
_gun2.default.chain.no = function (cb) {
  var gun = this,
      chain = gun.chain(),
      flag;
  gun.not(function (a, b, c) {
    flag = true;
    if (!cb) {
      return;
    }
    cb.call(this, a, b, c);
  });
  gun.get(function (at, ev) {
    if (flag) {
      return ev.off();
    }
    chain._.on('in', at);
  });
  return chain;
};
//# sourceMappingURL=no.js.map
