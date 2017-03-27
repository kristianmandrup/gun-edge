"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putAt = putAt;
exports.addPut = addPut;
function putAt(node, at, obj, cb, opt) {
  var pathNode = node.path(at);
  if (pathNode) {
    node._.paths = node._.paths || [];
    pathNode.put(obj, cb, opt);
    node._.paths.push(at);
  } else {
    throw new Error("No such path " + at);
  }
}

function addPut(_ref) {
  var chain = _ref.chain;

  chain.putAt = function (at, obj, cb, opt) {
    return putAt(this, at, obj, cb, opt);
  };

  chain.paths = function () {
    return this._.paths || [];
  };

  return chain;
}
//# sourceMappingURL=put.js.map
