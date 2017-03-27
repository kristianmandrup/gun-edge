'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$zen = $zen;
exports.addZen = addZen;

var _zenObservable = require('zen-observable');

var _zenObservable2 = _interopRequireDefault(_zenObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// See https://github.com/staltz/xstream
function $zen(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var id = void 0,
      name = void 0;
  node.val(function (data) {
    id = Gun.node.soul(data);
    name = opts.name || id || 'unknown';
  });

  var op = opts.op || 'on';
  var log = function log() {
    if (opts.log) {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['zen:', name].concat(args));
    }
  };

  // see Producer https://github.com/staltz/xstream#producer

  var observer = function observer(listener) {
    log('start');
    var eventListener = function eventListener(event) {
      if (listener.next) {
        log('event', event);
        listener.next(event);
      } else {
        throw new Error('Listener missing next(event) method');
      }
    };
    node[op](eventListener);
  };

  return new _zenObservable2.default(observer);
};

function addZen(_ref) {
  var chain = _ref.chain;

  chain.$zen = function (opts) {
    return $zen(this, opts);
  };
  return chain;
}
//# sourceMappingURL=zen.js.map
