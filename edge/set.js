"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAt = setAt;
exports.addSet = addSet;
function setAt(node, at, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    pathNode.set(cb, opt);
  } else {
    throw new Error("No such path " + at);
  }
}

function addSet(_ref) {
  var chain = _ref.chain;

  chain.setAt = function (cb, opt) {
    return setAt(this, cb, opt);
  };
  return chain;
}
//# sourceMappingURL=set.js.map
