'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addValue = exports.addRecurse = exports.addNo = exports.addMapReduce = exports.addLocal = exports.addLive = exports.addInspect = exports.addFields = exports.addEach = exports.addDate = exports.addAsync = undefined;
exports.add = add;

exports.default = function (Gun) {
  return add.apply(undefined, [Gun].concat(allNames));
};

var _async = require('./async');

var _count = require('./count');

var _date = require('./date');

var _each = require('./each');

var _fields = require('./fields');

var _inspect = require('./inspect');

var _live = require('./live');

var _local = require('./local');

var _mapReduce = require('./map-reduce');

var _no = require('./no');

var _recurse = require('./recurse');

var _value = require('./value');

// import {
//   addOut
// } from './out'

// import { addEdge } from './edge'

var chains = {
  addAsync: _async.$addAll,
  addCount: _count.addCount,
  addDate: _date.addDate,
  addEach: _each.addEach,
  addFields: _fields.addFields,
  addInspect: _inspect.addInspect,
  addLive: _live.addLive,
  addLocal: _local.addLocal,
  addMapReduce: _mapReduce.addMapReduce,
  addNo: _no.addNo,
  addRecurse: _recurse.addRecurse,
  addValue: _value.addValue
};
// import {
//   addFilter
// } from './filter'


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function add(Gun) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    var nameCap = capitalize(name);
    var fun = 'add' + nameCap;
    chains[fun]({
      chain: Gun.chain,
      Gun: Gun
    });
  });
  return Gun;
}

var allNames = ['async', 'date', 'each', 'fields',
// 'filter',
'inspect', 'live', 'local', 'mapReduce', 'no',
// 'out',
'recurse', 'value'];

exports.addAsync = _async.$addAll;
exports.addDate = _date.addDate;
exports.addEach = _each.addEach;
exports.addFields = _fields.addFields;
exports.addInspect = _inspect.addInspect;
exports.addLive = _live.addLive;
exports.addLocal = _local.addLocal;
exports.addMapReduce = _mapReduce.addMapReduce;
exports.addNo = _no.addNo;
exports.addRecurse = _recurse.addRecurse;
exports.addValue = _value.addValue;
//# sourceMappingURL=all.js.map
