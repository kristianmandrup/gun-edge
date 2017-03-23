# Gun edge

Extra DSL convenience extensions for [Gun.js](http://gun.js.org/)
Many of the snippets were extracted from [Gun Snippets 0.3](https://github.com/amark/gun/wiki/Snippets-(v0.3.x))

Some extra chain methods have been added, such as `mapReduce` and some for working with Promises or async/await (ES7) instead of callbacks.

## Install

`npm i -S gun-edge`

## Use

Assuming Babel or similar transpiler setup (2017)

import all

```js
import 'gun-edge' // import all chain methods
```

import specific

```js
import 'gun-edge/dist/async' // import async (Promise) methods
import 'gun-edge/dist/map-reduce' // import mapReduce chain method
import 'gun-edge/dist/value' // value chain method
```

You can do the same using `require` for Node.js

## API extensions

- `Gun.create`

gun chain methods

- `.date(dateValue)`
- `.each()`
- `.live(cb, opt)` - listen to new values like `on` but without the meta data
- `.local(data, cb, opt)` - store locally only, no peer sync
- `.mapReduce(options, cb, putCb, opt)` - mapReduce on a bucket (see below)
- `.no(cb)`
- `.out(navOpts)`
- `.recurse(cb, filter)` - recursively navigate bucket graph/tree structure
- `.value(cb, opt)` - get the node value (no meta)
- `.valueAt(path, cb, opt)` : get value at the `path` (no meta)
- `.localFields()` - get list of *local* field names (keys) in the bucket
- `.fields(cb)` - return fields to cb

Async methods (`Promise` or ES7 `async/await`). Prefix with `$`

- `.$fields(opt)` - get fields (ie. property names)
- `.$val(opt)` - full value (with meta)
- `.$value(opt)` - get value (no meta)
- `.$valueAt(path, opt)` - get value at the `path` (no meta)
- `.$map(transform, opt)` - map and optionally transform (broken in gun?)
- `.$mapReduce(options, putCb, opt)` - mapReduce

## mapReduce

Iterate and transform all the properties of a bucket!
The `mapReduce` chain function takes the following `options` map and a `cb` function
that receives the map-reduced (ie. transformed) bucket.

```js
.mapReduce({
  iterator: 'val', // default
  // processWhile: function({field, val})
  // updateWhen: function({field, val})
  logging: false, // default
  newField: reverse, // or string
  newValue: 'ready', // or function
  value: (val, field) => 'done', // or string
  filter: noColor('blue'),
  filters: [noColor('red'), noColor('green')]
}, cb, [putCb], [opt])
```

### Arguments

The callback `cb` is called when done. Arguments: `putCb` and `opt`  are optional.
`putCb` is used on any internal `put`, including delete (ie. `put(null)`)
`opt` is the typical Gun opt for controlling sync/storage.

#### processWhile

updateWhen

The `processWhile` & `updateWhen` functions are both called with a context object:

```js
{
  oldProps: {},
  newProps: {},
  filteredFields: {},
  visited: {},
  updated: false,
  processedFields: 0,
  fields: [], // to process
  ignoreFields: [], // to ignore
  allFields: [
    //'red', 'blue', ...
  ]
}
```

The default `processWhile` function:

```js
function defaultProcessWhile({
  field,
  val,
  ctx
}) {
  // ie. not a revisited field
  return !ctx.visited[field]
}
```

Which means it stops iterating once it encounters a field it has already visited.

```js
function defaultUpdateWhen({
  field,
  val,
  ctx
}) {
  let processedAll = (processedFields >= ctx.allFields.length)
  let visitedAll = ctx.allFields.every(f => ctx.visited[f])
  return visitedAll && processedAll
}
```

Default function to delete items from bucket.
Override by supplying `deleteFromBucket` function option


```js
function defaultDeleteFromBucket(bucket, ctx) {
  let deleteKeys = Object.keys(ctx.filteredFields)
  if (deleteKeys.length > 0) {
    log('DELETE', deleteKeys)
    for (let dkey of deleteKeys) {
      bucket.get(dkey).put(null, putCb, opt)
    }
  }
}
```

Default function to update bucket.
Override by supplying `updateBucket` function option

```js
function defaultUpdateBucket(bucket, ctx) {
  log('put', ctx.oldProps)
  bucket.put(ctx.oldProps, putCb, opt)
  log('put', ctx.newProps)
  bucket.put(ctx.newProps, putCb, opt)
}
```

Default `done` function which calls the `cb` with the transformed bucket
Override by supplying `done` function option

```js
function defaultDone(bucket, cb) {
  log('DONE')
  if (cb) {
    cb(bucket)
  } else {
    throw Error('Missing callback', cb)
  }
}
```

**Usage Example**

```js
import 'gun-edge/dist/map-reduce'

// where str is the property field name in this case
function reverse(str, val) {
  return str ? str.split('').reverse().join('') : str
}

async function cb(bucket) {
  let violet = await bucket.$valueAt('violet')
  console.log('colors::', await bucket.$value())
  console.log('violet::', violet)
  t.is(violet, 'violet')
}

let cols = gun.get('colors')

let colors = cols.put({
  violet: true,
  red: true,
  green: false
})

// remove a color field
const noColor = (color) => {
  return (field, value) => {
    return field === color
  }
}

cols.mapReduce({
  newField: reverse,
  newValue: 'ready',
  value: (v) => 'done',
  filters: [noColor('red'), noColor('green')]
}, cb)

/*
colors:: { violet: 'done',
  red: null,
  green: null,
  teloiv: 'ready',
  der: 'ready' }
violet:: done
*/
```

### Promise async/await variant

```js
import 'gun-edge/dist/async/map-reduce'

// add status created to each existing user
let result = await users.$mapReduce({
  value: (v) => Object.assign(v, {
    status: 'created'
  })
})
```

Example usage, assuming we supply some of our own overrides and customization options

```js
let logger = new Logger(opts)
let reducedCols = await cols.$mapReduce({
  newField: reverse,
  newValue: 'ready',
  value: (v) => 'done',
  filters: [noColor('red'), noColor('green')],
  // fields = ['red', 'green'], // only process these fields
  // ignoreFields = ['pink'], // skip these fields
  // validField: function(field, ctx) // determine to process this field or not
  processWhile, // function(field, val, ctx)
  updateBucket, // function(bucket, ctx)
  deleteFromBucket, // function(bucket, ctx)
  // example of override
  done: (bucket, cb) => {
    logger.log('COLORS UPDATED')
    cb(bucket)
  }
})
```

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