# Gun edge

Edge DSL for [Gun.js](http://gun.js.org/)

## Install

`npm i gun-edge`

## Case study

`Mark` and `Amber` were `married in 2014`

The `gun-edge` DSL tries to facilitate making such a relationship in a Gun graph

### Using the DSL

```js
import Gun from 'gun/gun'
import 'gun-edge'

// Create a new gun instance
var gun = Gun();

var amber = gun.get('amber').put({
  name: "amber"
});
var mark = gun.get('mark').put({
  name: "mark"
});
var edge = gun.put({
  married: 2014
});
edge.get('inout').put(amber);
edge.get('outin').put(mark);
amber.get('spouse').put(edge);
mark.get('spouse').put(edge);

// now that will let you traverse with the raw gun API any direction:

await gun.get('amber').get('spouse').get('outin').valAsync() // mark
gun.get('mark').get('spouse').get('inout').valAsync() // amber.

// Added val and value methods to work with async/await and ES6 Promise

// WORKS
let amberAwait = await gun.get('mark').get('spouse').get('inout').valueAsync()
gun.get('mark').get('spouse').get('inout').valueAsync()
  .then(node => {
    t.is(amberAwait, node)
  })

// WORKS
test('out', async t => {
  let amberLong = await gun.get('mark').get('spouse').get('inout').valueAsync()
  // shorthand
  let amberShort = await gun.get('mark').out('spouse')
  // same result :)
  t.is(amberLong, amberShort)
})

// TODO...

gun.get('mark').edge('spouse', amber)

// where amber is a gun reference.
gun.get('mark').edge('spouse', {
  married: 2014
})

// where second parameter is a plain object, it updates the edge itself
// (not what the edge is pointing to).

// returns a reference to amber. (ie edge traversal)
gun.get('mark').edge('spouse')

// called with the edge data itself.
gun.get('mark').edge('spouse', function () {})
```

## TODO

Make it all work!

## Future

Add transformation to LevelGraph (likely in another plugin)

The soul (ie. `node._.#`) could just be transformed to `@id` as expected by
[Level-JSONLD](https://github.com/mcollina/levelgraph-jsonld)

Gun Graph JSON

```js
  "_": {
    "#": "persons/mateo"
    // ...
  },
  "name": "Matteo",
  "knows": [{
    "_": {
      "#": "persons/daniele"
    },
    "name": "Daniele"
  }, {
    "_": {
      "#": "persons/lucio"
    },
    "name": "Lucio"
  }]
```

Level-JSONLD format

```js
var nested = {
  "@context": {
    "name": "http://xmlns.com/foaf/0.1/name",
    "knows": "http://xmlns.com/foaf/0.1/knows"
  },
  "@id": "persons/mateo",
  "name": "Matteo",
  "knows": [{
    "@id": "persons/daniele",
    "name": "Daniele"
  }, {
    "@id": "persons/lucio",
    "name": "Lucio"
  }]
};

// store it in Level DB :)

db.jsonld.put(nested, function(err, obj) {
  // do something...
});


// Do advanced triplet search!!
// ...
```

There is also a [gun-level](https://github.com/PsychoLlama/gun-level) and even [level.js](https://github.com/maxogden/level.js)

[Level storage-back-ends](https://github.com/Level/levelup/wiki/Modules#storage-back-ends)

## License

ISC