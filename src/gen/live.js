export function* $live(node) {
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
  gun.live(resolveAndReload)
}

export function $addLive({
  chain
}) {
  chain.$live = function* () {
    yield $live(this)
  }
  return chain
}