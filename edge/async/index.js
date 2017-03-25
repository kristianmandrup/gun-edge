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

var _live = require('./live');

var _iterate = require('./iterate');

var _on = require('./on');

var _no = require('./no');

var _recurse = require('./recurse');

var chains = {
  $addFields: _fields.$addFields,
  $addLive: _live.$addLive,
  $addIterate: _iterate.$addIterate,
  $addMap: _map.$addMap,
  $addMapReduce: _mapReduce.$addMapReduce,
  $addOn: _on.$addOn,
  $addNo: _no.$addNo,
  $addRecurse: _recurse.$addRecurse,
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
    var fun = '$add' + nameCap;
    chains[fun]({
      chain: Gun.chain,
      Gun: Gun
    });
  });
}

var allNames = ['fields', 'map', 'mapReduce', 'val', 'value', 'live', 'iterate', 'on', 'no', 'recurse'];

function $addAll(_ref) {
  var Gun = _ref.Gun;

  add.apply(undefined, [Gun].concat(allNames));
}

exports.default = $addAll;
//# sourceMappingURL=index.js.map
