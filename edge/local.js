"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.local = local;
exports.addLocal = addLocal;
function local(node, data, cb, opt) {
  opt = opt || {};
  opt.peers = {};
  return node.put(data, cb, opt);
}

function addLocal(_ref) {
  var chain = _ref.chain;

  chain.local = function (data, cb, opt) {
    return local(this, data, cb, opt);
  };

  return chain;
}
//# sourceMappingURL=local.js.map
