"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$on = $on;
exports.$addOn = $addOn;

var _marked = [$on].map(regeneratorRuntime.mark);

function $on(node) {
  var nextResolve, promise, resolveAndReload;
  return regeneratorRuntime.wrap(function $on$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nextResolve = void 0, promise = void 0;

          resolveAndReload = function resolveAndReload(value) {
            if (nextResolve) nextResolve({
              value: value,
              next: function next() {
                return promise;
              }
            });
            promise = new Promise(function (resolve) {
              return nextResolve = resolve;
            });
            return promise;
          };

          resolveAndReload();
          node.on(resolveAndReload);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function $addOn(_ref) {
  var chain = _ref.chain;

  chain.$on = regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return $on(this);

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
