"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localFields = localFields;
exports.fields = fields;
function localFields(node) {
  var mp = node.map().val(function (v) {
    return v;
  });
  var map = Object.values(mp._.map);
  return Object.values(map).map(function (v) {
    return v.at.field;
  });
}

function fields(node, cb, opt) {
  node.value(function (v) {
    return cb(Object.keys(v));
  });
}
//# sourceMappingURL=fields.js.map
