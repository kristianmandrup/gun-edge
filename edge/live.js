"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = live;
exports.addLive = addLive;
function live(node, cb, opt) {
  return node.on(function (val, field) {
    if (val) {
      delete val._;
    }
    cb.call(this, val, field);
  }, opt);
}

function addLive(chain, Gun) {
  chain.live = function (cb, opt) {
    return live(this, cb, opt);
  };

  return chain;
}
//# sourceMappingURL=live.js.map
