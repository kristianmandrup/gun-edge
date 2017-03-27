'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.$addAll = $addAll;

var _rx = require('./rx');

var _xstream = require('./xstream');

var _zen = require('./zen');

var chains = {
  addXStream: _xstream.addXStream,
  addRx: _rx.addRx,
  addZen: _zen.addZen
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

var allNames = ['rx', 'xstream', 'zen'];

function $addAll(_ref) {
  var Gun = _ref.Gun;

  add.apply(undefined, [Gun].concat(allNames));
}

exports.default = $addAll;
//# sourceMappingURL=index.js.map
