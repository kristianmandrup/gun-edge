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

function addEach(_ref) {
  var chain = _ref.chain;

  chain.each = function (cb, opt) {
    return each(this);
  };
  return chain;
}
//# sourceMappingURL=each.js.map
