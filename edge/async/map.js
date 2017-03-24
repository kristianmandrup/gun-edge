"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$map = $map;
exports.$addMap = $addMap;
function $map(node, transform, opt) {
  return new Promise(function (resolve, reject) {
    var mapped = node.map(transform, opt).value(function (v) {
      return v;
    });
    resolve(mapped);
  });
}

function $addMap(chain) {
  chain.$map = async function (transform, opt) {
    return await $map(this, transform, opt);
  };
  return chain;
}
//# sourceMappingURL=map.js.map
