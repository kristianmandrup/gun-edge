'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.$csp = $csp;
exports.addCsp = addCsp;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

var _jsCsp = require('js-csp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var csp = require('js-csp');

// See https://github.com/ubolonton/js-csp/blob/master/doc/basic.md

// See https://github.com/staltz/xstream

// import csp from 'js-csp'
function $csp(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var id = void 0;

  var channel = opts.channel,
      buffer = opts.buffer,
      name = opts.name,
      condition = opts.condition,
      _opts$op = opts.op,
      op = _opts$op === undefined ? 'on' : _opts$op,
      _opts$putOp = opts.putOp,
      putOp = _opts$putOp === undefined ? 'put' : _opts$putOp;


  var bufferSize = 2;
  var bufferType = 'fixed';

  if (buffer) {
    bufferSize = buffer.size || bufferSize;
    bufferType = buffer.type || bufferType;
  }

  buffer = buffer || csp.buffers[bufferType](bufferSize);

  var defaultChannel = function defaultChannel(buffer) {
    return csp.chan(buffer);
  };

  channel = channel || defaultChannel(buffer);

  node.val(function (data) {
    id = _gun2.default.node.soul(data);
    name = name || id || 'unknown';
  });

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

  var defaultCondition = function defaultCondition() {
    return true;
  };
  condition = condition || defaultCondition;

  var eventListener = function eventListener(event) {
    if (condition(event)) {
      log('Channel PUT', event);
      (0, _jsCsp.go)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return csp[putOp](channel, event, putCb);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  };

  var lastValue = void 0;
  node[op](function (value) {
    if (value !== lastValue) {
      log(op, 'new', value);
      eventListener(value);
    } else {
      log('.');
    }
  });

  return channel;
}

function addCsp(_ref) {
  var chain = _ref.chain;

  chain.$csp = function (opts) {
    return $csp(this, opts);
  };
  return chain;
}
//# sourceMappingURL=csp.js.map
