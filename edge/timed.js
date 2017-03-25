'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timed = timed;
exports.addTimed = addTimed;
function timed(node) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof opts === 'function') {
    opts = {
      cb: opts
    };
  }

  var _opts = opts,
      cb = _opts.cb,
      nextObj = _opts.nextObj,
      nextOpts = _opts.nextOpts,
      stopCondition = _opts.stopCondition,
      operation = _opts.operation,
      _opts$interval = _opts.interval,
      interval = _opts$interval === undefined ? 100 : _opts$interval,
      _opts$num = _opts.num,
      num = _opts$num === undefined ? 0 : _opts$num,
      _opts$maxNum = _opts.maxNum,
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
    return Object.assign(opts, {
      num: num
    });
  };

  var defaultOp = function defaultOp(node, obj, opts) {
    node.put(obj);
  };

  nextObj = nextObj || defaultNextObj;
  nextOpts = nextOpts || defaultNextOpts;
  stopCondition = stopCondition || defaultStop;
  operation = operation || defaultOp;

  setTimeout(function () {
    var obj = Object.assign(nextObj(num, opts));
    operation(node, obj, opts);
    if (stopCondition(obj, opts)) {
      cb(num);
    }

    iterate(node, nextOpts(opts, obj.num));
  }, interval);
}

function addTimed(_ref2) {
  var chain = _ref2.chain;

  chain.timed = function (opts) {
    return timed(this, opts);
  };
  return chain;
}
//# sourceMappingURL=timed.js.map
