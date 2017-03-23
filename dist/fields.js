'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.fields = function () {
  var mp = this.map().val(function (v) {
    return v;
  });
  var map = Object.values(mp._.map);
  return Object.values(map).map(function (v) {
    return v.at.field;
  });
};
//# sourceMappingURL=fields.js.map
