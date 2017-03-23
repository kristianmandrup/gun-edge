'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.$map = function (transform, opt) {
  var self = this;
  return new Promise(function (resolve, reject) {
    var mapped = self.map(transform, opt).value(function (v) {
      return v;
    });
    resolve(mapped);
  });
};
//# sourceMappingURL=map.js.map
