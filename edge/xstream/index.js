'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stream = stream;
exports.addStream = addStream;

var _xstream = require('xstream');

var _xstream2 = _interopRequireDefault(_xstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stream(node) {
  return _xstream2.default.create({
    start: function start(listener) {
      var eventListener = function eventListener(event) {
        return listener.next(event);
      };
      node.on(eventListener);
    },
    stop: function stop() {}
  });
};

function addStream(_ref) {
  var chain = _ref.chain;

  chain.stream = function () {
    return stream(this);
  };
  return chain;
}
//# sourceMappingURL=index.js.map
