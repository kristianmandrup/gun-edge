'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.no = no;
exports.addNo = addNo;
function no(node, cb) {
  var chain = node.chain(),
      flag;

  node.not(function (a, b, c) {
    flag = true;
    if (!cb) {
      return;
    }
    cb.call(this, a, b, c);
  });

  node.get(function (at, ev) {
    if (flag) {
      return ev.off();
    }
    chain._.on('in', at);
  });
  return chain;
}

function addNo(_ref) {
  var chain = _ref.chain;

  chain.no = function (cb) {
    return no(this, cb);
  };

  return chain;
}
//# sourceMappingURL=no.js.map
