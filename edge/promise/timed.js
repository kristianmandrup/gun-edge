'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.$timed = $timed;
exports.$addTimed = $addTimed;

var _timed = require('../timed');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $timed(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new _promise2.default(function (resolve, reject) {
    opts = (0, _assign2.default)(opts, {
      cb: resolve
    });
    (0, _timed.timed)(node, opts);
  });
}

function $addTimed(_ref) {
  var chain = _ref.chain;

  chain.$timed = function (opts) {
    return $timed(this, opts);
  };
  return chain;
}
//# sourceMappingURL=timed.js.map
