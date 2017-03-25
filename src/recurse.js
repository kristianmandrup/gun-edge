export function recurse(node, cb, filter) {
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

export function addRecurse({
  chain
}) {
  chain.recurse = function (cb, filter) {
    return recurse(this, cb, filter)
  }

  return chain
}