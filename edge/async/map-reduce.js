'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$mapReduce = $mapReduce;
exports.$addMapReduce = $addMapReduce;

var _mapReduce = require('../map-reduce');

function $mapReduce(node, options, putCb, opt) {
  return new Promise(function (resolve, reject) {
    node.mapReduce(options, resolve, putCb, opt);
  });
}

function $addMapReduce(chain) {
  (0, _mapReduce.addMapReduce)(chain);

  chain.$mapReduce = async function (options, putCb, opt) {
    return await $mapReduce(this, options, putCb, opt);
  };
  return chain;
}
//# sourceMappingURL=map-reduce.js.map
