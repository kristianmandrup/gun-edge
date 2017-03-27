"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.$recurse = $recurse;
exports.$addRecurse = $addRecurse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $recurse(node, filter) {
  return new _promise2.default(function (resolve, reject) {
    node.recurse(resolve, filter);
  });
}

function $addRecurse(_ref) {
  var chain = _ref.chain;

  chain.$recurse = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(filter) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return $recurse(this, filter);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return chain;
}
//# sourceMappingURL=recurse.js.map
