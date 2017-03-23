'use strict';

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

require('../map-reduce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gun2.default.chain.$mapReduce = function (options, putCb, opt) {
  var self = this;
  return new Promise(function (resolve, reject) {
    self.mapReduce(options, resolve, putCb, opt);
  });
};
//# sourceMappingURL=map-reduce.js.map
