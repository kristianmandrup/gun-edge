import xs from 'xstream';

export function stream(node) {
  return xs.create({
    start: (listener) => {
      let eventListener = (event) => {
        return listener.next(event);
      };
      node.on(eventListener);
    },
    stop: () => {}
  })
};

export function addStream({
  chain
}) {
  chain.stream = function () {
    return stream(this)
  }
  return chain
}