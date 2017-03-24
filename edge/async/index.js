'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.$addAll = $addAll;

var _fields = require('./fields');

var _map = require('./map');

var _mapReduce = require('./map-reduce');

var _val = require('./val');

var _value = require('./value');

var chains = {
  $addFields: _fields.$addFields,
  $addMap: _map.$addMap,
  $addMapReduce: _mapReduce.$addMapReduce,
  $addVal: _val.$addVal,
  $addValue: _value.$addValue
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function add(Gun) {
  for (var _len = arguments.length, names = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  names.forEach(function (name) {
    var nameCap = capitalize(name);
    chains['$add' + nameCap](Gun.chain, Gun);
  });
}

var allNames = ['fields', 'map', 'mapReduce', 'val', 'value'];

function $addAll(Gun) {
  add.apply(undefined, [Gun].concat(allNames));
}
//# sourceMappingURL=index.js.map
