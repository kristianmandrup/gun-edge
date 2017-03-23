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
import 'gun-edge/dist/mapReduce' // import mapReduce chain method
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

Async methods (use via Promise or async/await)
- `.valAsync(cb, opt)`: async - full value (with meta)
- `.valueAsync(cb, opt)` : async - get value (no meta)
- `.valueAt(path, cb, opt)` : async - get value at the `path` (no meta)
- `.mapAsync(transform, opt)` : async - map and optionally transform (broken in gun?)
- `.mapReduceAsync(options, cb, putCb, opt)`: async - mapReduce

## mapReduce

Iterate and transform all the properties of a bucket!
The `mapReduce` chain function takes the following `options` map and a `cb` function
that receives the map-reduced (ie. transformed) bucket.

```js
.mapReduce({
  // stopCondition: function({field, val})
  iterator: 'live', // default
  logging: false, // default
  newField: reverse, // or string
  newValue: 'ready', // or function
  value: (val, field) => 'done', // or string
  filter: noColor('blue'),
  filters: [noColor('red'), noColor('green')]
}, cb, [putCb], [opt])
```

### Arguments

callback `cb` is called when done. Arguments: `putCb` and `opt`  are optional.
`putCb` is used on any internal `put`, including delete (ie. `put(null)`)
`opt` is the typical Gun opt for controlling sync/storage.

**Usage Example**

```js
import 'gun-edge/mapReduce'

// where str is the property field name in this case
function reverse(str, val) {
  return str ? str.split('').reverse().join('') : str
}

async function cb(bucket) {
  let violet = await bucket.valueAt('violet')
  console.log('colors::', await bucket.valueAsync())
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

TODO: Add Promise variant

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