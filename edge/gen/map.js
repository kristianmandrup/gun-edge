'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$map = $map;
exports.$addMap = $addMap;

var _marked = [$map].map(regeneratorRuntime.mark);

function $map(node, _ref) {
  var transform = _ref.transform,
      _ref$operator = _ref.operator,
      operator = _ref$operator === undefined ? 'val' : _ref$operator,
      opt = _ref.opt;
  var nextResolve, promise, resolveAndReload;
  return regeneratorRuntime.wrap(function $map$(_context) {
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
          node.map(transform, opt)[operator](resolveAndReload);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function $addMap(_ref2) {
  var chain = _ref2.chain;

  chain.$map = regeneratorRuntime.mark(function _callee(_ref3) {
    var _ref3$operator = _ref3.operator,
        operator = _ref3$operator === undefined ? 'val' : _ref3$operator,
        transform = _ref3.transform,
        opt = _ref3.opt;
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return $map(this, {
              operator: operator,
              condition: condition,
              transform: transform,
              opt: opt
            });

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee, this);
  });
  return chain;
}
//# sourceMappingURL=map.js.map
