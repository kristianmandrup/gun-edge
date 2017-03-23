'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.recurse = function (cb, filter) {
  if (!(filter instanceof Object)) {
    filter = {};
  }
  this.val(cb);
  this.map().val(function (data) {
    if (!(data instanceof Object)) {
      return;
    }
    var soul = _gun2.default.is.node.soul(data);
    if (filter[soul]) {
      return;
    }
    filter[soul] = true;
    this.recurse(cb, filter);
  });
  return this;
};
//# sourceMappingURL=recurse.js.map
