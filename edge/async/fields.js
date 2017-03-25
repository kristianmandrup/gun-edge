'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$fields = $fields;
exports.$addFields = $addFields;

var _value = require('../value');

function $fields(node) {
  return new Promise(function (resolve, reject) {
    node.value(function (v) {
      return resolve(Object.keys(v));
    });
  });
}

function $addFields(_ref) {
  var chain = _ref.chain;

  (0, _value.addValue)({
    chain: chain
  });

  chain.$fields = function (cb, opt) {
    return $fields(this, cb, opt);
  };
  return chain;
}
//# sourceMappingURL=fields.js.map
