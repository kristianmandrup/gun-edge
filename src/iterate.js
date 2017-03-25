export function iterate(node, opts = {}) {
  if (typeof opts === 'function') {
    opts = {
      cb: opts
    }
  }

  let {
    cb,
    nextObj,
    nextOpts,
    stopCondition,
    interval = 100,
    num = 0
  } = opts

  let defaultStop = ({
    num
  }, opts) => {
    return num > 10
  }
  let defaultNextObj = (num, opts) => {
    return {
      num: num + 1
    }
  }

  let defaultNextOpts = (opts, num) => {
    return Object.assign(opts, {
      num
    })
  }

  nextObj = nextObj || defaultNextObj
  nextOpts = nextOpts || defaultNextOpts
  stopCondition = stopCondition || defaultStop

  setTimeout(() => {
    let obj = Object.assign(nextObj(num, opts))
    node.put(obj)
    if (stopCondition(obj, opts)) {
      cb(num)
    }

    iterate(node, nextOpts(opts, obj.num))
  }, interval)
}

export function addIterate({
  chain
}) {
  chain.iterate = function (opts) {
    return iterate(this, opts)
  }
  return chain
}