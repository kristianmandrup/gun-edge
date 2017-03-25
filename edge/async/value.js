'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$value = $value;
exports.$valueAt = $valueAt;
exports.$addValue = $addValue;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

var _value = require('../value');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function $value(node, opt) {
  return new Promise(function (resolve, reject) {
    node.value(resolve, opt);
  });
}

async function $valueAt(node, at, opt, Gun) {
  var path = node.path(at);
  if (path) {
    return path.$value(opt, Gun);
  } else {
    throw new Error('No such path ' + at);
  }
}

function $addValue(_ref) {
  var chain = _ref.chain;

  (0, _value.addValue)({
    chain: chain
  });

  chain.$value = async function (opt) {
    return await $value(this, opt);
  };

  chain.$valueAt = async function (opt) {
    return await $valueAt(this, opt);
  };

  return chain;
}
//# sourceMappingURL=value.js.map
