## LevelGraph IO

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
