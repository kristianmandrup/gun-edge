export function* $map(node, {
  transform,
  operator = 'val',
  opt
}) {
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
  node.map(transform, opt)[operator](resolveAndReload)
}

export function $addMap({
  chain
}) {
  chain.$map = function* ({
    operator = 'val',
    transform,
    opt
  }) {
    yield $map(this, {
      operator,
      condition,
      transform,
      opt
    })
  }
  return chain
}