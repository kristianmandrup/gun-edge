import Gun from 'gun/gun';
// import csp from 'js-csp'
import {
  go
  // put,
  // putAsync
} from 'js-csp'

const csp = require('js-csp')

// See https://github.com/ubolonton/js-csp/blob/master/doc/basic.md

// See https://github.com/staltz/xstream
export function $csp(node, opts = {}) {
  let id



  let {
    channel,
    buffer,
    name,
    condition,
    op = 'on',
    putOp = 'put'
  } = opts

  let bufferSize = 2
  let bufferType = 'fixed'

  if (buffer) {
    bufferSize = buffer.size || bufferSize
    bufferType = buffer.type || bufferType
  }

  buffer = buffer || csp.buffers[bufferType](bufferSize)

  let defaultChannel = (buffer) => csp.chan(buffer)

  channel = channel || defaultChannel(buffer)

  node.val(data => {
    id = Gun.node.soul(data)
    name = name || id || 'unknown'
  })

  const log = function (...args) {
    if (opts.log) {
      console.log('rx:', name, ...args)
    }
  }

  let defaultPutCb = (event) => {
    log('event was put on channel :)')
  }
  let putCb = opts.putCb || defaultPutCb

  let defaultCondition = () => true
  condition = condition || defaultCondition

  let eventListener = function (event) {
    if (condition(event)) {
      log('Channel PUT', event)
      go(function* () {
        yield csp[putOp](channel, event, putCb)
      })
    }
  }

  let lastValue
  node[op]((value) => {
    if (value !== lastValue) {
      log(op, 'new', value)
      eventListener(value)
    } else {
      log('.')
    }
  });

  return channel
}

export function addCsp({
  chain
}) {
  chain.$csp = function (opts) {
    return $csp(this, opts)
  }
  return chain
}