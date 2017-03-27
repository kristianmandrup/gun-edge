import Observable from 'zen-observable';

// See https://github.com/staltz/xstream
export function $zen(node, opts = {}) {
  let id, name
  node.val(data => {
    id = Gun.node.soul(data)
    name = opts.name || id || 'unknown'
  })

  const op = opts.op || 'on'
  const log = function (...args) {
    if (opts.log) {
      console.log('zen:', name, ...args)
    }
  }

  // see Producer https://github.com/staltz/xstream#producer

  const observer = (listener) => {
    log('start')
    let eventListener = (event) => {
      if (listener.next) {
        log('event', event)
        listener.next(event)
      } else {
        throw new Error('Listener missing next(event) method')
      }
    }
    node[op](eventListener);
  }

  return new Observable(observer)
};

export function addZen({
  chain
}) {
  chain.$zen = function (opts) {
    return $zen(this, opts)
  }
  return chain
}