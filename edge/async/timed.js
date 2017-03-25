'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$timed = $timed;
exports.$addTimed = $addTimed;

var _timed = require('../timed');

function $timed(node, opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign(opts, {
      cb: resolve
    });
    (0, _timed.timed)(node, opts);
  });
}

function $addTimed(_ref) {
  var chain = _ref.chain;

  chain.$timed = async function (opts) {
    return await $timed(this, opts);
  };
  return chain;
}
//# sourceMappingURL=timed.js.map
