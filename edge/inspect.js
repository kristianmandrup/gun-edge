'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;
exports.addInspect = addInspect;

var _value = require('./value');

function print(node, label, opt, inspector) {
  node.value(function (val) {
    label ? inspector(label, val) : inspector(val);
  }, opt);
}

function addInspect(_ref) {
  var chain = _ref.chain,
      Gun = _ref.Gun;

  (0, _value.addValue)(chain, Gun);
  var inspector = Gun.log || console.log;

  chain.print = function (label, opt) {
    print(this, label, opt, inspector);
  };

  return chain;
}
//# sourceMappingURL=inspect.js.map
