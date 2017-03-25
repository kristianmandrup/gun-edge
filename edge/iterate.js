'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;
exports.addIterate = addIterate;
function iterate(node) {
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
      _opts$interval = _opts.interval,
      interval = _opts$interval === undefined ? 100 : _opts$interval,
      _opts$num = _opts.num,
      num = _opts$num === undefined ? 0 : _opts$num;


  var defaultStop = function defaultStop(_ref, opts) {
    var num = _ref.num;

    return num > 10;
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

  nextObj = nextObj || defaultNextObj;
  nextOpts = nextOpts || defaultNextOpts;
  stopCondition = stopCondition || defaultStop;

  setTimeout(function () {
    var obj = Object.assign(nextObj(num, opts));
    node.put(obj);
    if (stopCondition(obj, opts)) {
      cb(num);
    }

    iterate(node, nextOpts(opts, obj.num));
  }, interval);
}

function addIterate(_ref2) {
  var chain = _ref2.chain;

  chain.iterate = function (opts) {
    return iterate(this, opts);
  };
  return chain;
}
//# sourceMappingURL=iterate.js.map
