'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.out = out;

var _gun = require('gun/gun');

var _gun2 = _interopRequireDefault(_gun);

require('./value');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var instOf = function instOf() {
  var clazz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;

  return function (val) {
    return val instanceof clazz;
  };
};

var notOriginator = function notOriginator(selfId) {
  return function (data) {
    return selfid !== _gun2.default.node.soul(data);
  };
};

// get('spouse').get('inout').val(cb)
async function calcOut(selfId, out, edge, v) {
  var def = edge.get(out);
  var propId = _gun2.default.node.soul(v);
  // // only if not referencing to self
  if (propId !== selfId) {
    return def;
  } else {
    // find first other property that references a valid Object
    return mapReduce(edge, {
      filters: [instOf(Object), notOriginator(selfId)]
    });
  }
}

/*
await gun.get('mark').out({
  spouse: 'bride'
})
*/
async function out(navigation) {
  if (typeof navigation === 'string') {
    navigation = _defineProperty({}, navigation, navigation);
  }
  var key = Object.keys(navigation)[0];
  var out = Object.values(navigation)[0];

  var selfId = _gun2.default.node.soul(this);
  var edge = this.get(key);

  var edgeNode = await edge.valAsync();
  var res = calcOut(selfId, out, edge, edgeNode);
  return await res.valueAsync();
}
//# sourceMappingURL=out.js.map
