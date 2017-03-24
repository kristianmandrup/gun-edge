"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$on = $on;
exports.$addOn = $addOn;
function $on(node, opt) {
  return new Promise(function (resolve, reject) {
    node.on(resolve, opt);
  });
}

function $addOn(chain) {
  chain.$on = async function (opt) {
    return await $on(this, opt);
  };

  return chain;
}
//# sourceMappingURL=on.js.map
