'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.value = function (cb, opt) {
  return this.val(function (val, field) {
    delete val._;
    cb.call(this, val, field);
  }, opt);
};

_gun2.default.chain.valueAt = function (at, cb, opt) {
  var node = this.path(at);
  if (node) {
    return node.value(cb, opt);
  } else {
    throw new Error('No such path ' + at);
  }
};
//# sourceMappingURL=value.js.map
