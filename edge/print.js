'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;
exports.addPrint = addPrint;

var _value = require('./value');

function print(node, label, opt, log) {
  node.value(function (val) {
    label ? log(label, val) : log(val);
  }, opt);
}

function addPrint(_ref) {
  var chain = _ref.chain,
      Gun = _ref.Gun;

  (0, _value.addValue)(chain, Gun);
  var log = Gun.log || console.log;

  chain.print = function (label, opt) {
    print(this, label, opt, log);
  };

  return chain;
}
//# sourceMappingURL=print.js.map
