"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.each = each;
function each(node) {
  var each = node.map();
  return node.val.apply(each, arguments);
}
//# sourceMappingURL=each.js.map
