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

gun.get('amber').get('spouse').get('outin').val(cb) // mark
gun.get('mark').get('spouse').get('inout').val(cb) // amber.

// The goal of this gun extension is to make this
// process easier - rather than writing those 7 or 9 lines of code every time
// for everything, you just call the extension and it does it
// for you.
// And the most important piece with the extension,
// would be to intelligently determine that "mark.spouse"
// means inout, and "amber.spouse" means outin.
// I propose the methods are named like this:
gun.get('mark').edge('spouse', amber)

// where amber is a gun reference.
gun.get('mark').edge('spouse', {
  married: 2014
})

// where second parameter is a plain object, it updates the edge itself
// (not what the edge is pointing to).
gun.get('mark').edge('spouse') // winds up returning a reference to amber.
gun.get('mark').edge('spouse', function () {}) // winds up getting called with the edge data itself.
```

## TODO

Make it work!

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