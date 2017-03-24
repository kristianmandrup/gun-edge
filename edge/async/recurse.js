"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$recurse = $recurse;
exports.$addRecurse = $addRecurse;
function $recurse(node, filter) {
  return new Promise(function (resolve, reject) {
    node.recurse(resolve, filter);
  });
}

function $addRecurse(chain) {
  chain.$recurse = async function (filter) {
    return await $recurse(this, filter);
  };
  return chain;
}
//# sourceMappingURL=recurse.js.map
