import Gun from 'gun/gun';
// import csp from 'js-csp'
const csp = require('js-csp')

// See https://github.com/ubolonton/js-csp/blob/master/doc/basic.md

// See https://github.com/staltz/xstream
export function $csp(node, channel, opts = {}) {
  let id, name
  node.val(data => {
    id = Gun.node.soul(data)
    name = opts.name || id || 'unknown'
  })
  const op = opts.op || 'on'
  const log = function (...args) {
    if (opts.log) {
      console.log('rx:', name, ...args)
    }
  }

  let defaultPutCb = (event) => {
    log('event was put on channel :)')
  }
  let putCb = opts.putCb || defaultPutCb

  let eventListener = function (event) {
    log('Channel PUT', event)
    csp.putAsync(channel, event, putCb)
    // csp.put(channel, event)
  }

  node[op](eventListener);
}