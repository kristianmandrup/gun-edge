'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments);
};
//# sourceMappingURL=each.js.map
