'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.value = value;
exports.valueAt = valueAt;
exports.valAt = valAt;
exports.addValue = addValue;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function value(node, cb, opt) {
  return node.val(function (val, field) {
    var v = _gun2.default.obj.copy(val);
    delete v._;
    cb.call(this, v, field);
  }, opt);
}

function valueAt(node, at, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    value(pathNode, cb, opt);
  } else {
    throw new Error('No such path ' + at);
  }
}

function valAt(node, at, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    pathNode.val(cb, opt);
  } else {
    throw new Error('No such path ' + at);
  }
}

function addValue(_ref) {
  var chain = _ref.chain;

  chain.value = function (cb, opt) {
    return value(this, cb, opt);
  };

  chain.valueAt = function (at, cb, opt) {
    return valueAt(this, at, cb, opt);
  };

  chain.valAt = function (at, cb, opt) {
    return valAt(this, at, cb, opt);
  };

  return chain;
}
//# sourceMappingURL=value.js.map
