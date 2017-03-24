"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.date = date;
exports.addDate = addDate;
function date(node, data, Gun) {
  if (Gun.fns.is(data)) {
    return node.val(function (val) {
      data.call(this, new Date(val));
    });
  }
  return node.put(data.getTime());
}

function addDate(chain, Gun) {
  chain.date = function (data) {
    return date(node, data, Gun);
  };

  return chain;
}
//# sourceMappingURL=date.js.map
