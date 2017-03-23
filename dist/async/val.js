'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.$val = function (opt) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.val(resolve, opt);
  });
};
//# sourceMappingURL=val.js.map
