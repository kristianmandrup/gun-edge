'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.timed = timed;
exports.addTimed = addTimed;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timed(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var id = void 0,
      name = void 0;
  node.val(function (data) {
    id = _gun2.default.node.soul(data);
    name = opts.name || id || 'unknown';
  });

  console.log('TIMED', opts);

  var log = function log() {
    if (opts.log || opts.logging) {
      var _console;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['timed:', name].concat(args));
    }
  };

  if (typeof opts === 'function') {
    opts = {
      cb: opts
    };
  }

  recurseTimed(opts);

  function recurseTimed(opts) {
    var cb = opts.cb,
        nextObj = opts.nextObj,
        nextOpts = opts.nextOpts,
        stopCondition = opts.stopCondition,
        operation = opts.operation,
        logging = opts.logging,
        _opts$interval = opts.interval,
        interval = _opts$interval === undefined ? 100 : _opts$interval,
        _opts$num = opts.num,
        num = _opts$num === undefined ? 0 : _opts$num,
        _opts$maxNum = opts.maxNum,
        maxNum = _opts$maxNum === undefined ? 10 : _opts$maxNum;


    var defaultStop = function defaultStop(_ref, opts) {
      var num = _ref.num;

      return num > maxNum;
    };
    var defaultNextObj = function defaultNextObj(num, opts) {
      return {
        num: num + 1
      };
    };

    var defaultNextOpts = function defaultNextOpts(opts, num) {
      return (0, _assign2.default)(opts, {
        num: num
      });
    };

    var defaultOp = function defaultOp(node, obj, opts) {
      log('put', obj);
      node.put(obj);
    };

    nextObj = nextObj || defaultNextObj;
    nextOpts = nextOpts || defaultNextOpts;
    stopCondition = stopCondition || defaultStop;
    operation = operation || defaultOp;

    setTimeout(function () {
      var obj = (0, _assign2.default)(nextObj(num, opts));
      operation(node, obj, opts);
      if (stopCondition(obj, opts)) {
        if (cb) {
          cb(num);
        } else {
          console.error('timed: Missing cb to stop', opts);
          process.exit(1);
        }
      }

      recurseTimed(nextOpts(opts, obj.num));
    }, interval);
  }
}

function addTimed(_ref2) {
  var chain = _ref2.chain;

  chain.timed = function (opts) {
    return timed(this, opts);
  };
  return chain;
}
//# sourceMappingURL=timed.js.map
