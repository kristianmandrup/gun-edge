'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.$value = function (opt) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.value(resolve, opt);
  });
};

_gun2.default.chain.$valueAt = function (at, opt) {
  var path = this.path(at);
  if (path) {
    return path.$value(opt);
  } else {
    throw new Error('No such path ' + at);
  }
};
//# sourceMappingURL=value.js.map
