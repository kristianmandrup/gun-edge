"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$val = $val;
exports.$addVal = $addVal;
function $val(node, opt) {
  return new Promise(function (resolve, reject) {
    node.val(resolve, opt);
  });
}

function $addVal(chain) {
  chain.$val = async function (opt) {
    return await $val(this, opt);
  };

  return chain;
}
//# sourceMappingURL=val.js.map
