export function* $on(node, opts) {
  let nextResolve, promise;
  const resolveAndReload = (value) => {
    console.log('resolveAndReload', value)
    if (nextResolve) nextResolve({
      value,
      next: (() => promise)
    });
    promise = new Promise((resolve) => nextResolve = resolve);
    return promise;
  }
  resolveAndReload();
  node.on(resolveAndReload)
}

export function $addOn({
  chain
}) {
  chain.$on = function* (opts) {
    yield $on(this)
  }
  return chain
}