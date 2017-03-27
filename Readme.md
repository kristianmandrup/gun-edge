# Gun edge

Extra DSL extensions for [Gun.js](http://gun.js.org/)

Many of the snippets were extracted from [Gun Snippets 0.3.x](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)) and upgraded to work with Gun +0.6

Some extra chain methods have been added, such as `mapReduce` and `iterator`.

Most async methods now come with a ES6 Promises or async/await (ES7) variant.
The Promise methods are prefixed with `$`.

## Maturity

As of version 0.8.x, not all of the chain methods have been fully tested yet.
Please help test them out and/or add more tests. Thanks.

## Install

`npm i -S gun-edge`

## Use

Assuming Babel or similar transpiler setup (2017)

To add all chain methods:

```js
import Gun from 'gun/gun'
import chain from 'gun-edge'
chain(Gun)
```

To control which chain methods to add:

```js
import {
  add
} from 'gun-edge'
add(Gun, 'date', 'fields')
```

Import individual chain modules

```js
import {
  inspect,
  addInspect
} from 'gun-edge/edge/inspect'
addInspect(Gun.chain)
```

### Require (Node.js)

Using `require`

```js
const Gun = require('gun/gun')
require('gun-edge')(Gun)
```

## API extensions

Chain methods available:

**Iteration**

- `.each()` - see [each](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#guneach)
- `.timed(opts)` - interval based recursive iteration on node  (see `timed-iterator.test.js`)
- `.mapReduce(options, cb, putCb, opt)` - mapReduce on a bucket (see below)
- `.recurse(cb, filter)` - recursively navigate bucket graph/tree structure

**Operations**

- `.count(numFun)` - create a [CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) counter, see [counter](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#-crdt-counter)
- `.copy(val)` - make a copy/clone of a value
- `.date(dateValue)` - date field, see [date](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#date)
- `.local(data, cb, opt)` - store locally only, no peer sync
- `.no(cb)` - see [no](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#-no)
- `.value(cb, opt)` - get the node value (no meta)
- `.valueAt(path, cb, opt)` : get value at the `path` (no meta)
- `.valAt(path, cb, opt)` : get value at the `path`
- `.setAt(path, cb, opt)` : set value at the `path`
- `.putAt(path, cb, opt)` : put value at the `path`
- `.localFields()` - get list of *local* field names (keys) in the bucket
- `.fields(cb)` - return fields to cb
- `.soul()` - return the soul (id) of the node
- `.print(label)` - print value to console (no meta). Note: You can set `Gun.log`, by default: `console.log`

**Promise enabled methods**

ES6 `Promise` or ES7 `async/await`), always prefixed with `$`

- `.$fields(opt)` - get fields (ie. property names)
- `.$iterate(opts)` - iterate
- `.$mapReduce(options, putCb, opt)` - map/reduce
- `.$no(opt)` - blocks if no data, see [no](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#-no)
- `.$val(opt)` - full value (with meta)
- `.$value(opt)` - get value (no meta)
- `.$valueAt(path, opt)` - get value at the `path` (no meta)
- `.$recurse(filter)` - recursive filter
- `.$timed(opts)` - timed recursion

**Observable streams for superior Async flow control**

Observable methods are also (currently) prefixed with `$`

[Observable](https://tc39.github.io/proposal-observable/) stream support is included for:
- [Rx](http://reactivex.io/rxjs/)
- [Zen](https://github.com/zenparsing/zen-observable)
- [Xstream](http://staltz.com/xstream/) for [Cycle.js](cycle.js.org)

Example: Rx.js

```js
// optional
let options = {
  log: true,
  op: 'live'
}

// or simply $rx(node) or even node.$rx()
let obs = $rx(node, options)

let subscription = obs
  .subscribe(x => {
    console.log({received: x})
  })
```

### Useful internal Gun functions

`Gun.obj.copy(val)` - copy a value
`Gun.obj.map(data, function(val, field){ ... }` - map over a node
`Gun.fn.is` - check if something is a function
`Gun.text.random()` - generate random text
`Gun.is.node.soul(data)` - test if data has a soul (ie. is a Gun node)
`Gun.node.soul(data)` - return id of Gun node

Please add more internal Gun functions to this list for reference ;)

## Useful chain methods

`node.back()` - go one level back/up in the graph

**WIP**

- `.out(navOpts, cb)` - traverse edge (WIP)
- `.edge(navOpts/data)` or `link`  - for linking nodes and traversing links/edges
- `.filter(filterFun, cb)` - filter fields

### CSP Channels: WIP

[CSP channel](https://github.com/ubolonton/js-csp/blob/master/doc/basic.md) also included :)

The main idea is outlined [here](http://swannodette.github.io/2013/08/24/es6-generators-and-csp)

CSP learning resources:

- [Introduction To CSP In Javascript](http://lucasmreis.github.io/blog/quick-introduction-to-csp-in-javascript/)
- [Using CSP As Application Architecture](http://lucasmreis.github.io/blog/using-csp-as-application-architecture/)


To start a process just pass a *generator* as a parameter to the `go` function.
By using the `yield` keyword, you can pause a process, freeing the main thread
Channels are queues. Whenever a process calls `take` on a channel, it pauses until a value is `put` into that channel.

Processes that put a value on a channel also pause until some other process uses take.
Because channels are queues, when a process takes from a channel, the value will not be available for other processes to take. One process puts, one process takes.
A channel can be buffered, which means that, for a given number of puts, a put will not make the process pause.

If the channel has a buffer of size 2, the third put will block the process, until someone takes from it.

See the `test/channel/` folder for some test examples:

```js
let size = 2
let buffer = csp.buffers.fixed(size)
// let buffer = csp.buffers.sliding(size)
// let buffer = csp.buffers.dropping(size)
// const promiseCh = csp.promiseChan();

// NOTE: optionally customize channel and buffer used
// let promiseCh = csp.chan(buffer)

promiseCh = $csp(node, {
  // channel: promiseCh, // will use fixed(2) buffer by default
  // log: true,
  op: 'live',
  // only put on channel when node value has a num field
  condition: (val) => val.num
})

node.timed({
  maxNum,
  logging: true,
  cb: resolve
})

let num = 0
let condition = () => num < 5

// Please help improved this!!!
csp.go(function* () {
  while (condition()) {
    const value = yield csp.take(promiseCh)
    console.log('value', value)
  }
})
```

## mapReduce

See full [mapReduce guide](https://github.com/kristianmandrup/gun-edge/Map-Reduce.md)

## Contributing

### Compile/Build

The project includes a `gulpfile` configured to use Babel 6.
All `/src` files are compiled to `/dist` including source maps.

Scripts:

- start: `npm start`
- build: `npm run build` (ie. compile)
- watch and start: `npm run watch`
- watch and build: `npm run watch:b`

### Run Tests

`npm test` or simply `ava test`

## Examples

The `/examples` folder will at some point include some example projects, including a web page (with live reload)

## Sandbox

For playing around...

## Docs

Various ideas sketched out in `/docs`

## License

MIT Kristian Mandrup