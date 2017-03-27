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

exports.$no = $no;
exports.$addNo = $addNo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $no(node) {
  return new _promise2.default(function (resolve, reject) {
    node.no(resolve);
  });
}

function $addNo(_ref) {
  var chain = _ref.chain;

  chain.$no = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return $no(this);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return chain;
}
//# sourceMappingURL=no.js.map
