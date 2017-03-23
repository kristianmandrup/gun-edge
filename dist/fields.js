'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.localFields = function () {
  var mp = this.map().val(function (v) {
    return v;
  });
  var map = Object.values(mp._.map);
  return Object.values(map).map(function (v) {
    return v.at.field;
  });
};

_gun2.default.chain.fields = function (cb, opt) {
  this.value(function (v) {
    return cb(Object.keys(v));
  });
};
//# sourceMappingURL=fields.js.map
