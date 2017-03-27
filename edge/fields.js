"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

exports.localFields = localFields;
exports.fields = fields;
exports.addFields = addFields;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function localFields(node) {
  var mp = node.map().val(function (v) {
    return v;
  });
  var map = (0, _values2.default)(mp._.map);
  return (0, _values2.default)(map).map(function (v) {
    return v.at.field;
  });
}

function fields(node, cb, opt) {
  node.value(function (v) {
    return cb((0, _keys2.default)(v));
  }, opt);
}

function addFields(_ref) {
  var chain = _ref.chain;

  chain.fields = function (cb, opt) {
    return fields(this, cb, opt);
  };
  return chain;
}
//# sourceMappingURL=fields.js.map
