'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inspect = inspect;
exports.addInspect = addInspect;

var _value = require('./value');

function inspect(node, label) {
  (0, _value.value)(node, function (val) {
    label ? console.log(label, val) : console.log(val);
  }, opt);
}

function addInspect(chain) {
  // addValue(chain, Gun)

  chain.inspect = function (label) {
    inspect(this, label);
  };

  return chain;
}
//# sourceMappingURL=inspect.js.map
