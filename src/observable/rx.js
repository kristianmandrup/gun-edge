import {
  Observable
} from 'rxjs';
import Gun from 'gun/gun';

// See https://github.com/staltz/xstream
export function $rx(node, opts = {}) {
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

  // see Producer https://github.com/staltz/xstream#producer

  const observer = (listener) => {
    log('start')
    let eventListener = (event) => {
      if (listener.next) {
        log(event)
        listener.next(event)
      } else {
        throw new Error('Listener missing next(event) method')
      }
    }
    node[op](eventListener);
  }

  return Observable.create(observer)
};

export function addRx({
  chain
}) {
  chain.$rx = function (opts) {
    return $rx(this, opts)
  }
  return chain
}