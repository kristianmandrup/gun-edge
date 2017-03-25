export function* $on(node) {
  let nextResolve, promise;
  const resolveAndReload = (value) => {
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
  chain.$on = function* () {
    yield $on(this)
  }
  return chain
}