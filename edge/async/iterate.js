'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$iterate = $iterate;
exports.$addIterate = $addIterate;

var _iterate = require('../iterate');

function $iterate(node, opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign(opts, {
      cb: resolve
    });
    (0, _iterate.iterate)(node, opts);
  });
}

function $addIterate(_ref) {
  var chain = _ref.chain;

  chain.$iterate = async function (opts) {
    return await $iterate(this, opts);
  };
  return chain;
}
//# sourceMappingURL=iterate.js.map
