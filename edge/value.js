'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = value;
exports.valueAt = valueAt;
exports.addValue = addValue;

var _copy = require('../copy');

function value(node, cb, opt) {
  return node.val(function (val, field) {
    var v = node.copy(val);
    delete v._;
    cb.call(this, v, field);
  }, opt);
}

function valueAt(node, at, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    return pathNode.value(cb, opt);
  } else {
    throw new Error('No such path ' + at);
  }
}

function addValue(chain, Gun) {
  (0, _copy.addCopy)(chain, Gun);

  chain.value = function (cb, opt) {
    return value(this, cb, opt);
  };

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt);
  };

  return chain;
}
//# sourceMappingURL=value.js.map
