'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.$addPromise = $addPromise;

var _fields = require('./fields');

var _mapReduce = require('./map-reduce');

var _val = require('./val');

var _value = require('./value');

var _timed = require('./timed');

var _no = require('./no');

var _recurse = require('./recurse');

var chains = {
  $addFields: _fields.$addFields,
  $addMapReduce: _mapReduce.$addMapReduce,
  $addNo: _no.$addNo,
  $addRecurse: _recurse.$addRecurse,
  $addVal: _val.$addVal,
  $addValue: _value.$addValue,
  $addTimed: _timed.$addTimed
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

var allNames = ['fields', 'mapReduce', 'val', 'value', 'timed', 'no', 'recurse'];

function $addPromise(_ref) {
  var Gun = _ref.Gun;

  add.apply(undefined, [Gun].concat(allNames));
}

exports.default = $addPromise;
//# sourceMappingURL=index.js.map
