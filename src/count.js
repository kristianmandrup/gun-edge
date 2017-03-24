export function count(node, num) {
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

export function addCount(chain, Gun) {
  chain.count = function (num) {
    return count(this, num)
  }
  return chain
}