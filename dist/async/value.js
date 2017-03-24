'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$value = $value;
exports.$valueAt = $valueAt;
exports.$addValue = $addValue;

var _value = require('../value');

async function $value(node, opt) {
  return new Promise(function (resolve, reject) {
    node.value(resolve, opt);
  });
}

async function $valueAt(node, at, opt) {
  var path = node.path(at);
  if (path) {
    return path.$value(opt);
  } else {
    throw new Error('No such path ' + at);
  }
}

function $addValue(chain) {
  (0, _value.addValue)(chain);

  chain.$value = async function (opt) {
    return await $value(this, opt);
  };

  chain.$valueAt = async function (opt) {
    return await $valueAt(this, opt);
  };

  return chain;
}
//# sourceMappingURL=value.js.map
