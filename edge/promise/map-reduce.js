'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.$mapReduce = $mapReduce;
exports.$addMapReduce = $addMapReduce;

var _mapReduce = require('../map-reduce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $mapReduce(node, options, putCb, opt) {
  return new _promise2.default(function (resolve, reject) {
    node.mapReduce(options, resolve, putCb, opt);
  });
}

function $addMapReduce(_ref) {
  var chain = _ref.chain;

  (0, _mapReduce.addMapReduce)({
    chain: chain
  });

  chain.$mapReduce = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(options, putCb, opt) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return $mapReduce(this, options, putCb, opt);

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  return chain;
}
//# sourceMappingURL=map-reduce.js.map
