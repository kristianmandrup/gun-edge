"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$live = $live;
exports.$addLive = $addLive;
function $live(node, opt) {
  return new Promise(function (resolve, reject) {
    node.live(resolve, opt);
  });
}

function $addLive(chain) {
  chain.$live = async function (opt) {
    return await $live(this, opt);
  };

  return chain;
}
//# sourceMappingURL=live.js.map
