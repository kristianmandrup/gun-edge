const csp = require('js-csp')

function* player(name, table) {
  while (true) {
    let ball = yield csp.take(table);

    if (ball === csp.CLOSED) {
      console.log(name + ": table's gone");
      return;
    }

    ball.hits += 1;
    console.log(`${name} ${ball.hits}`);

    yield csp.timeout(100);
    yield csp.put(table, ball);
  }
}

csp.go(function* () {
  const table = csp.chan();

  csp.go(player, ["ping", table]);
  csp.go(player, ["pong", table]);

  yield csp.put(table, {
    hits: 0
  });
  yield csp.timeout(1000);

  table.close();
});