"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recurse = recurse;
exports.addValue = addValue;
function recurse(node, cb, filter) {
  if (!(filter instanceof Object)) {
    filter = {};
  }
  node.val(cb);
  node.map().val(function (data) {
    if (!(data instanceof Object)) {
      return;
    }
    var soul = node.soul(data);
    if (filter[soul]) {
      return;
    }
    filter[soul] = true;
    this.recurse(cb, filter);
  });
  return node;
};

function addValue(chain, Gun) {
  chain.recurse = function (cb, filter) {
    return resurce(this, cb, filter);
  };

  return chain;
}
//# sourceMappingURL=recurse.js.map
