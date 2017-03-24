"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = live;
exports.addLive = addLive;
function live(node, cb, opt, Gun) {
  return node.on(function (val, field) {
    var v = Gun.node.copy(val);
    if (v) {
      delete v._;
    }
    cb.call(this, v, field);
  }, opt);
}

function addLive(chain, Gun) {
  chain.live = function (cb, opt) {
    return live(this, cb, opt, Gun);
  };

  return chain;
}
//# sourceMappingURL=live.js.map
