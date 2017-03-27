'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSoul = addSoul;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addSoul(_ref) {
  var chain = _ref.chain;

  chain.soul = function () {
    return _gun2.default.node.soul(this);
  };
  return chain;
}
//# sourceMappingURL=soul.js.map
