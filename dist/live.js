'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.live = function (cb, opt) {
  return this.on(function (val, field) {
    if (val) {
      delete val._;
    }
    cb.call(this, val, field);
  }, opt);
};
//# sourceMappingURL=live.js.map
