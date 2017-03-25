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
- `.localFields()` - get list of *local* field names (keys) in the bucket
- `.fields(cb)` - return fields to cb
- `.print(label)` - print value to console (no meta). Note: You can set `Gun.log`, by default: `console.log`

Promise enabled methods (ie. ES6 `Promise` or ES7 `async/await`), always prefixed with `$`.

- `.$fields(opt)` - get fields (ie. property names)
- `.$iterate(opts)` - iterate
- `.$mapReduce(options, putCb, opt)` - map/reduce

- `.$no(opt)` - blocks if no data, see [no](https://github.com/amark/gun/wiki/Snippets-(v0.3.x)#-no)
- `.$val(opt)` - full value (with meta)
- `.$value(opt)` - get value (no meta)
- `.$valueAt(path, opt)` - get value at the `path` (no meta)
- `.$recurse(filter)` - recursive filter

**Generators and Iterables**

In order to use Generators with Iterators, Gun nodes would need to provide a `next()` method which
returns an object with `value` and `done` keys.

Also see [iterator of promises](https://gist.github.com/domenic/5987999) and [async iterators](https://kriskowal.gitbooks.io/gtor/content/async-iterators.html)

Feel free to come with suggestions or make a PR :)

Some "dark magic" [here](https://github.com/brysgo/graphql-gun/blob/master/index.js#L9) could perhaps provide a way?

```js
let nextResolve, result, resultValue = {};
const iterableObj = () => {
  const nextPromise = new Promise((resolve) => nextResolve = resolve);
  return { value: resultValue, next: (() => nextPromise) };
};
const triggerUpdate = () => {
  if (nextResolve) {
    nextResolve(iterableObj())
  }
}

return new Promise((resolve) => {
  // ...
  chain.on((val) => {
    // ...
    triggerUpdate();
  })
})
```

**Streams for superior Async flow control**

Experimental `xstream` support is included, extracted from [cycle-gun](https://github.com/JuniperChicago/cycle-gun)

```js
import { addStream } from 'gun-edge/edge/xstream'
addStream(Gun.chain)

let mark = gun.get('mark)
mark.stream()
  .map((event) => {
    console.log('received', {
      event
    })
  })

// will count from 0 to 5 at 200ms interval, each time making
// a new put with current counter value
mark.timed({
  max: 5,
  interval: 200
})
```

**WIP**

- `.out(navOpts, cb)` - traverse edge (WIP)
- `.edge(navOpts/data)` or `link`  - for linking nodes and traversing links/edges
- `.filter(filterFun, cb)` - filter fields

### Useful internal Gun functions

`Gun.obj.copy(val)` - copy a value
`Gun.obj.map(data, function(val, field){ ... }` - map over a node
`Gun.fn.is` - check if something is a function
`Gun.text.random()` - generate random text

Please add more internal Gun functions etc. to this list ;)

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