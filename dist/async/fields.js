'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

require('../value');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.$fields = function () {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.value(function (v) {
      return resolve(Object.keys(v));
    });
  });
};
//# sourceMappingURL=fields.js.map
