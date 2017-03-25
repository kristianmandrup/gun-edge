"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$no = $no;
exports.$addNo = $addNo;
function $no(node) {
  return new Promise(function (resolve, reject) {
    node.no(resolve);
  });
}

function $addNo(_ref) {
  var chain = _ref.chain;

  chain.$no = async function () {
    return await $no(this);
  };
  return chain;
}
//# sourceMappingURL=no.js.map
