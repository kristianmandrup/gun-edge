'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.date = date;
exports.addDate = addDate;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function date(node, data) {
  if (_gun2.default.fns.is(data)) {
    return node.val(function (val) {
      data.call(this, new Date(val));
    });
  }
  return node.put(data.getTime());
}

function addDate(_ref) {
  var chain = _ref.chain;

  chain.date = function (data) {
    return date(node, data);
  };

  return chain;
}
//# sourceMappingURL=date.js.map
