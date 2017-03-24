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