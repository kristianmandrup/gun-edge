'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.$addGen = $addGen;

var _live = require('./live');

var _on = require('./on');

var _map = require('./map');

var chains = {
  $addLive: _live.$addLive,
  $addMap: _map.$addMap,
  $addOn: _on.$addOn
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

var allNames = ['live', 'map', 'on'];

function $addGen(_ref) {
  var Gun = _ref.Gun;

  add.apply(undefined, [Gun].concat(allNames));
}

exports.default = $addGen;
//# sourceMappingURL=index.js.map
