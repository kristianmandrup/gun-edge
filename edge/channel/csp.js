'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$csp = $csp;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import csp from 'js-csp'
var csp = require('js-csp');

// See https://github.com/ubolonton/js-csp/blob/master/doc/basic.md

// See https://github.com/staltz/xstream
function $csp(node, channel) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

  var defaultPutCb = function defaultPutCb(event) {
    log('event was put on channel :)');
  };
  var putCb = opts.putCb || defaultPutCb;

  var eventListener = function eventListener(event) {
    log('Channel PUT', event);
    csp.putAsync(channel, event, putCb);
    // csp.put(channel, event)
  };

  node[op](eventListener);
}
//# sourceMappingURL=csp.js.map
