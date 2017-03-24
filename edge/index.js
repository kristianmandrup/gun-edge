'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Gun) {
  Gun.chainAll = function () {
    for (var _len = arguments.length, funs = Array(_len), _key = 0; _key < _len; _key++) {
      funs[_key] = arguments[_key];
    }

    funs.forEach(function (fun) {
      return fun(Gun.chain, Gun);
    });
  };
  return (0, _all.addAll)(Gun);
};

var _all = require('./all');
//# sourceMappingURL=index.js.map
