import xs from 'xstream';


// See https://github.com/staltz/xstream
export function $xstream(node, opts = {}) {
  let id, name
  node.val(data => {
    id = Gun.node.soul(data)
    name = opts.name || id || 'unknown'
  })

  const op = opts.op || 'on'
  const log = function (...args) {
    if (opts.log) {
      console.log('xstream:', name, ...args)
    }
  }

  // see Producer https://github.com/staltz/xstream#producer

  const producer = {
    start: (listener) => {
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
    },
    stop: () => {}
  }

  return xs.create(producer)
};

export function addXStream({
  chain
}) {
  chain.$xstream = function (opts) {
    return $xstream(this, opts)
  }
  return chain
}