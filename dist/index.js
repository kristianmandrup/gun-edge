'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addValue = exports.addRecurse = exports.addOut = exports.addNo = exports.addMapReduce = exports.addLocal = exports.addLive = exports.addInspect = exports.addFilter = exports.addFields = exports.addEach = exports.addDate = exports.addCopy = exports.addAsync = undefined;
exports.add = add;
exports.addAll = addAll;

var _async = require('./async');

var _copy = require('./copy');

var _date = require('./date');

var _each = require('./each');

var _fields = require('./fields');

var _filter = require('./filter');

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
var chains = {
  $addAll: _async.$addAll,
  addCopy: _copy.addCopy,
  addCreate: addCreate,
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
// import { addEdge } from './edge'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function add(Gun) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    var nameCap = capitalize(name);
    chains['add' + nameCap](Gun.chain, Gun);
  });
}

var allNames = ['async', 'copy', 'date', 'each', 'fields', 'filter', 'inspect', 'live', 'local', 'mapReduce', 'no',
// 'out',
'recurse', 'value'];

exports.addAsync = addAsync;
exports.addCopy = _copy.addCopy;
exports.addDate = _date.addDate;
exports.addEach = _each.addEach;
exports.addFields = _fields.addFields;
exports.addFilter = _filter.addFilter;
exports.addInspect = _inspect.addInspect;
exports.addLive = _live.addLive;
exports.addLocal = _local.addLocal;
exports.addMapReduce = _mapReduce.addMapReduce;
exports.addNo = _no.addNo;
exports.addOut = addOut;
exports.addRecurse = _recurse.addRecurse;
exports.addValue = _value.addValue;
function addAll(Gun) {
  add.apply(undefined, [Gun].concat(allNames));
}
//# sourceMappingURL=index.js.map
