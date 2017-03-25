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
- `.live(cb, opt)` - listen to new values like `on` but without the meta data
- `.iterate(opts)` - iterate and update a node recursively using a timeout (see `async-iterator.test.js`)
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
- `.localFields()` - get list of *local* field names (keys) in the bucket
- `.fields(cb)` - return fields to cb
- `.print(label)` - print value to console (no meta). Note: You can set `Gun.log`, by default: `console.log`

Promise enabled methods (ie. ES6 `Promise` or ES7 `async/await`), always prefixed with `$`.

- `.$fields(opt)` - get fields (ie. property names)
- `.$live(opt)` - live listener to field updates (no meta)
- `.$iterate(opts)` - iterate
- `.$mapReduce(options, putCb, opt)` - map/reduce
- `.$map(transform, opt)` - map and optionally transform (broken in gun?)
- `.$no(opt)` - blocks if no data, see [no](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#-no)
- `.$on(opt)` - listen to field updates
- `.$val(opt)` - full value (with meta)
- `.$value(opt)` - get value (no meta)
- `.$valueAt(path, opt)` - get value at the `path` (no meta)
- `.$recurse(filter)` - recursive filter

Feel free to come with suggestions or make a PR :)

**Generators and Streams for superior Async flow control**

Iterator methods should be wrapped in Generators (or Observers) as well. We also want to support typical streams, such as `RxJS` and `xstream` (cycle). See [es6-generators-observable-async-flow-control](https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435#.icez856w3) perhaps using [IxJS](https://github.com/ReactiveX/IxJS)

**WIP**

- `.out(navOpts, cb)` - traverse edge (WIP)
- `.edge(navOpts/data)` or `link`  - for linking nodes and traversing links/edges
- `.filter(filterFun, cb)` - filter fields

### Useful Gun internal functions

`Gun.obj.copy(val)` - copy a value
`Gun.fns.is(data)` - check if Gun node?
`gun.not((a, b, c) => {})` - ??
`Gun.text.random()` - random text
`Gun.obj.map(data, function(val, field){ ... }` - map over a node

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