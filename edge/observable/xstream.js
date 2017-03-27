'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$xstream = $xstream;
exports.addXStream = addXStream;

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// See https://github.com/staltz/xstream
function $xstream(node) {
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

      (_console = console).log.apply(_console, ['xstream:', name].concat(args));
    }
  };

  // see Producer https://github.com/staltz/xstream#producer

  var producer = {
    start: function start(listener) {
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
    },
    stop: function stop() {}
  };

  return _xstream2.default.create(producer);
};

function addXStream(_ref) {
  var chain = _ref.chain;

  chain.$xstream = function (opts) {
    return $xstream(this, opts);
  };
  return chain;
}
//# sourceMappingURL=xstream.js.map
