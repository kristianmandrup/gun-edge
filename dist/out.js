'use strict';

var _value = require('./value');

var instOf = function instOf() {
  var clazz = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object;

  return function (val) {
    return val instanceof clazz;
  };
};

var notOriginator = function notOriginator(node, selfId) {
  return function (data) {
    return selfid !== node.soul(data);
  };
};

// // get('spouse').get('inout').val(cb)
// async function calcOut(node, selfId, out, edge, v) {
//   const def = edge.get(out)
//   const propId = node.soul(v)
//   // // only if not referencing to self
//   if (propId !== selfId) {
//     return def
//   } else {
//     // find first other property that references a valid Object
//     let targetNode = await
//     return node.$mapReduce({
//       filters: [
//         instOf(Object),
//         notOriginator(node, selfId)
//         // type?
//       ]
//     })

//     // return first field of filtered ones
//     let fields = await targetNode.$fields()
//     return fields[0]
//   }
// }

// /*
// await gun.get('mark').out({
//   spouse: 'bride'
// })
// */
// export async function out(node, navigation) {
//   if (typeof navigation === 'string') {
//     navigation = {
//       [navigation]: navigation
//     }
//   }
//   const key = Object.keys(navigation)[0]
//   const out = Object.values(navigation)[0]

//   const selfId = node.soul(this)
//   const edge = this.get(key)

//   const edgeNode = await edge.valAsync()
//   let res = calcOut(node, selfId, out, edge, edgeNode)
//   return await res.valueAsync()
// }
//# sourceMappingURL=out.js.map
