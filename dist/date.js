'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.date = function (data) {
  if (_gun2.default.fns.is(data)) {
    return this.val(function (val) {
      data.call(this, new Date(val));
    });
  }
  return this.put(data.getTime());
};
//# sourceMappingURL=date.js.map
