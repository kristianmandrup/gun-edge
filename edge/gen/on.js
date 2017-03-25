"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$on = $on;
exports.$addOn = $addOn;

var _marked = [$on].map(regeneratorRuntime.mark);

function $on(node, _ref) {
  var condition = _ref.condition,
      opt = _ref.opt;
  var c;
  return regeneratorRuntime.wrap(function $on$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          c = function c() {
            return true;
          };

          condition = condition || c;

        case 2:
          if (!condition(node)) {
            _context.next = 7;
            break;
          }

          _context.next = 5;
          return new Promise(function (resolve, reject) {
            node.on(resolve, opt);
          });

        case 5:
          _context.next = 2;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function $addOn(_ref2) {
  var chain = _ref2.chain;

  chain.$on = regeneratorRuntime.mark(function _callee(_ref3) {
    var condition = _ref3.condition,
        opt = _ref3.opt;
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return $on(this, {
              condition: condition,
              opt: opt
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee, this);
  });

  return chain;
}
//# sourceMappingURL=on.js.map
