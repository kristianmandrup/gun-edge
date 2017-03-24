'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = value;
exports.valueAt = valueAt;
exports.addValue = addValue;

var _copy = require('../copy');

function value(node, cb, opt, Gun) {
  return node.val(function (val, field) {
    var v = Gun.node.copy(val);
    delete v._;
    cb.call(this, v, field);
  }, opt);
}

function valueAt(node, at, cb, opt, Gun) {
  var pathNode = node.path(at);
  if (pathNode) {
    value(pathNode, cb, opt, Gun);
  } else {
    throw new Error('No such path ' + at);
  }
}

function addValue(chain, Gun) {
  (0, _copy.addCopy)(chain, Gun);

  chain.value = function (cb, opt) {
    return value(this, cb, opt, Gun);
  };

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt, Gun);
  };

  return chain;
}
//# sourceMappingURL=value.js.map
