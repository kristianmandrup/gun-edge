'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$map = $map;
exports.$addMap = $addMap;

var _marked = [$map].map(regeneratorRuntime.mark);

function $map(node) {
  var operator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'val';
  var transform = arguments[2];
  var opt = arguments[3];
  return regeneratorRuntime.wrap(function $map$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new Promise(function (resolve, reject) {
            var mapped = node.map(transform, opt)[operator](function (v) {
              return v;
            });
            resolve(mapped);
          });

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function $addMap(_ref) {
  var chain = _ref.chain;

  chain.$map = regeneratorRuntime.mark(function _callee() {
    var operator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'val';
    var transform = arguments[1];
    var opt = arguments[2];
    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return $map(this, operator, transform, opt);

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
