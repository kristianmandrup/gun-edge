"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putAt = putAt;
exports.addPut = addPut;
function putAt(node, at, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    pathNode.put(cb, opt);
  } else {
    throw new Error("No such path " + at);
  }
}

function addPut(_ref) {
  var chain = _ref.chain;

  chain.putAt = function (cb, opt) {
    return putAt(this, cb, opt);
  };
  return chain;
}
//# sourceMappingURL=put.js.map
