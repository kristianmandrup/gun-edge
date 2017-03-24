"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.addCopy = addCopy;
function copy(val, Gun) {
  return Gun.obj.copy(val);
}

function addCopy(chain, Gun) {
  chain.copy = function (val) {
    return copy(val, Gun);
  };

  return chain;
}
//# sourceMappingURL=copy.js.map
