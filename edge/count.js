'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = count;
exports.addCount = addCount;
function count(node, num) {
  if (typeof num === 'number') {
    node.path(Gun.text.random()).put(num);
  }
  if (typeof num === 'function') {
    var sum = 0;
    node.map().val(function (val) {
      num(sum += val);
    });
  }
  return node;
}

function addCount(chain, Gun) {
  chain.count = function (num) {
    return count(this, num);
  };
  return chain;
}
//# sourceMappingURL=count.js.map
