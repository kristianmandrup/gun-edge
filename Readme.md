# Gun edge

Extra DSL convenience extensions for [Gun.js](http://gun.js.org/)

## Install

`npm i -S gun-edge`

## API extensions

- `Gun.create`

gun chain methods
- `.date(dateValue)`
- `.each()`
- `.live(cb, opt)` - listen to new values like `on` but without the meta data
- `.local(data, cb, opt)` - store locally only, no peer sync
- `.mapReduce(opts, cb)` - mapReduce on a bucket (see below)
- `.no(cb)`
- `.out(navOpts)`
- `.recurse(cb, filter)` - recursively navigate bucket graph/tree structure
- `.value(cb, opt)` - get the node value (no meta)

Async methods (use via Promise or async/await)
- `.valueAsync(cb, opt)` : async - get the value (no meta)
- `.valueAt(path, cb, opt)` : async - get the value at the `path` (no meta)
- `.mapAsync(transform, opt)` : async - map and optionally transform (broken in gun?)
- `.valAsync(cb, opt)`: async - value with meta

## mapReduce

Iterate and transform all the properties of a bucket!
This is KILLER!!!

Example:

```js
import 'gun-edge/mapReduce'

function reverse(str) {
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
  tfield: reverse,
  newValue: 'ready',
  oldValue: (v) => 'done',
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

## TODO

Make it all work!

## Testing

`npm test`

or simply `ava`


## License

ISC