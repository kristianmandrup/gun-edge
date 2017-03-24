# Gun edge

Extra DSL convenience extensions for [Gun.js](http://gun.js.org/)
Many of the snippets were extracted from [Gun Snippets 0.3](https://github.com/amark/gun/wiki/Snippets-(v0.3.x))

Some extra chain methods have been added, such as `mapReduce` and some for working with Promises or async/await (ES7) instead of callbacks.

## Maturity

As of version 0.8, not all of the snippet/chain methods have been tested yet.

`.value` had to be tweaked to use `Gun.obj.copy(val)`.
This might be needed for other chain methods as well.
Please help making this library a nice abstraction layer on top of gun.

## Install

`npm i -S gun-edge`

## Use

Assuming Babel or similar transpiler setup (2017)

```js
import Gun from 'gun/gun'

import {
  addValue,
  $addAll,
  default as chainAll
} from 'gun-edge/all'

chainAll(Gun, addValue, $addAll)
```

Alternatively to chain everything:

```js
import chain from 'gun-edge'
chain(Gun)
```

Using `require` (Node.js) simply do:

```js
require('gun-edge')(Gun)
```

## API extensions

gun chain methods

- `.copy(val)` - make a copy/clone of a value
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
- `.inspect(label)` - print value to console (no meta)

Async methods (`Promise` or ES7 `async/await`). Prefix with `$`

- `.$fields(opt)` - get fields (ie. property names)
- `.$val(opt)` - full value (with meta)
- `.$value(opt)` - get value (no meta)
- `.$valueAt(path, opt)` - get value at the `path` (no meta)
- `.$map(transform, opt)` - map and optionally transform (broken in gun?)
- `.$mapReduce(options, putCb, opt)` - mapReduce

TODO:
- `$live`
- `$on`
- `$recurse`
- ...

Feel free to come with suggestions or make a PR :)

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
  newValue: 'ready', // or function(val, field)
  value: (val, field) => 'done', // or string
  // transform: function (field, val) => Object

  filter: noColor('blue'),
  filters: [noColor('red'), noColor('green')],
  // ... many more options
  context
}, cb, [putCb], [opt])
```

### Arguments

The callback `cb` is called when done. Arguments: `putCb` and `opt`  are optional.
`putCb` is used on any internal `put`, including delete (ie. `put(null)`)
`opt` is the typical Gun opt for controlling sync/storage.

#### ctx

All of the internal functions are both called with a context object:

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
  ],
  // putCb,
  // opt,
  // context: {}
}
```

#### processWhile

The default `processWhile` function:

```js
function defaultProcessWhile({field, val, ctx}) {
  // ie. not a revisited field
  return !ctx.visited[field]
}
```

Which means it stops iterating once it encounters a field it has already visited.

#### updateWhen

```js
function defaultUpdateWhen({field, val, ctx}) {
  let processedAll = (processedFields >= ctx.allFields.length)
  let visitedAll = ctx.allFields.every(f => ctx.visited[f])
  return visitedAll && processedAll
}
```

#### saveChanges

Function to save any changes in the bucket

```js
function defaultSaveChanges(bucket, changesObj, ctx) {
  bucket.put(changesObj, ctx.putCb, ctx.opt)
}
```

#### updateBucket

Default function to update bucket.
Override by supplying `updateBucket` function option

```js
function defaultUpdateBucket(bucket, ctx) {
  log('UPDATE', props)
  let props = Object.assign(ctx.oldProps, ctx.newProps)
  ctx.saveChanges(bucket, props, ctx)
}
```

#### filterBucket

Default function to delete items from bucket.
Override by supplying `filterBucket` function option

```js
  function defaultFilterBucket(bucket, ctx) {
    let deleteKeys = Object.keys(ctx.filteredFields)
    if (deleteKeys.length > 0) {
      log('FILTER', deleteKeys)
      let deleteObj = deleteKeys.reduce((obj, key) => {
        obj[key] = null
        return obj
      }, {})
      log('deleteObj', deleteObj)
      ctx.saveChanges(bucket, deleteObj, ctx)
    }
  }
```

#### done

Default `done` function which calls the `cb` with the transformed bucket
Override by supplying `done` function option

```js
function defaultDone(bucket, cb, ctx) {
  log('DONE')
  if (cb) {
    cb(bucket, ctx)
  } else {
    throw Error(`${ctx.iterator}: missing callback (in done)`)
  }
}
```

## Usage Examples: mapReduce

### Callbacks

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

### Promise async/await: mapReduce

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
  // transform // function(field, val) => Object

  filters: [noColor('red'), noColor('green')],
  // fields = ['red', 'green'], // only process these fields
  // ignoreFields = ['pink'], // skip these fields
  // validField: function(field, ctx) // determine to process this field or not
  processWhile, // function(field, val, ctx)
  updateBucket, // function(bucket, ctx)
  filterBucket, // function(bucket, ctx)
  // saveChanges // function(bucket, changesObj, ctx)
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