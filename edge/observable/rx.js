'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$rx = $rx;
exports.addRx = addRx;

var _rxjs = require('rxjs');

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// See https://github.com/staltz/xstream
function $rx(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var id = void 0,
      name = void 0;
  node.val(function (data) {
    id = _gun2.default.node.soul(data);
    name = opts.name || id || 'unknown';
  });
  var op = opts.op || 'on';
  var log = function log() {
    if (opts.log) {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['rx:', name].concat(args));
    }
  };

  // see Producer https://github.com/staltz/xstream#producer

  var observer = function observer(listener) {
    log('start');
    var eventListener = function eventListener(event) {
      if (listener.next) {
        log(event);
        listener.next(event);
      } else {
        throw new Error('Listener missing next(event) method');
      }
    };
    node[op](eventListener);
  };

  return _rxjs.Observable.create(observer);
};

function addRx(_ref) {
  var chain = _ref.chain;

  chain.$rx = function (opts) {
    return $rx(this, opts);
  };
  return chain;
}
//# sourceMappingURL=rx.js.map
