"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
exports.addEach = addEach;
function each(node) {
  var each = node.map();
  return node.val.apply(each, arguments);
}

function addEach(chain, Gun) {
  chain.each = function (cb, opt) {
    return each(this);
  };
  return chain;
}
//# sourceMappingURL=each.js.map
