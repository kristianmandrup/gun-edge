'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAll = exports.add = undefined;

exports.default = function (Gun) {
  Gun.chainAll = function () {
    for (var _len = arguments.length, funs = Array(_len), _key = 0; _key < _len; _key++) {
      funs[_key] = arguments[_key];
    }

    funs.forEach(function (fun) {
      return fun(Gun.chain, Gun);
    });
  };
  return (0, _all2.default)(Gun);
};

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.add = _all.add;
exports.addAll = _all2.default;
//# sourceMappingURL=index.js.map
