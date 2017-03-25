'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = live;
exports.addLive = addLive;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function live(node, cb, opt) {
  return node.on(function (val, field) {
    var v = _gun2.default.obj.copy(val);
    if (v) {
      delete v._;
    }
    cb.call(this, v, field);
  }, opt);
}

function addLive(_ref) {
  var chain = _ref.chain;

  chain.live = function (cb, opt) {
    return live(this, cb, opt);
  };

  return chain;
}
//# sourceMappingURL=live.js.map
