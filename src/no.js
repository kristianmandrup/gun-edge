export function no(node, cb) {
  var chain = node.chain(),
    flag;

  node.not(function (a, b, c) {
    flag = true;
    if (!cb) {
      return
    }
    cb.call(this, a, b, c)
  });

  node.get(function (at, ev) {
    if (flag) {
      return ev.off()
    }
    chain._.on('in', at);
  });
  return chain;
}

export function addNo({
  chain
}) {
  chain.no = function (cb) {
    return no(this, cb)
  }

  return chain
}