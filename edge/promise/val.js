"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.$val = $val;
exports.$addVal = $addVal;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $val(node, opt) {
  return new _promise2.default(function (resolve, reject) {
    node.val(resolve, opt);
  });
}

function $addVal(_ref) {
  var chain = _ref.chain;

  chain.$val = function (opt) {
    return $val(this, opt);
  };
  return chain;
}
//# sourceMappingURL=val.js.map
