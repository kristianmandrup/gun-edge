# Gun edge

Extra DSL convenience extensions for [Gun.js](http://gun.js.org/)

## Install

`npm i -S gun-edge`

## Case study

`Mark` and `Amber` were `married in 2014`

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
var link = gun.put({
  married: 2014
});

link.get('inout').put(amber);
link.get('outin').put(mark);
amber.get('spouse').put(link);
mark.get('spouse').put(link);

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
  let amberShort = await gun.get('mark').out({spouse: 'inout'})
  // same result :)
  t.is(amberLong, amberShort)
})

// We could also have the "Join node" instead have meaningful back references (edges)
// - bride
// - groom
// But then how could we navigate? Then we would have to traverse all paths
// pointing to objects that are not back to self and return first one!

// create marriage link node
marriage.get('bride').put(amber);
marriage.get('groom').put(mark);

// details on marriage
amber.get('marriage').put(marriage);
mark.get('marriage').put(marriage);

// direct links
amber.get('spouse').put(mark)
mark.get('spouse').put(amber)

// Much more meaningful!

// TODO...

gun.get('mark').link('married', marriage, {bride: amber})
gun.get('amber').link('married', marriage, {groom: mark})

// The full monty!
gun.link(['mark', 'amber'], {
  married: {
    // link node to be used/created
    in: { year: 2014 }, // alternative using: node
    with: {
      // back references from link node
      bride: 'amber',
      groom: 'mark'
    }
  }
})

let marriage = gun.put({
  married: 2014
})

// or [mark, amber]
let sources = ['mark', 'amber']

gun.link(sources, {
  married: {
    // link node to be used/created
    using: marriage,
    with: {
      // back references from link node
      bride: 'amber', // or bride: amber
      groom: 'mark'   // or bride: mark
    }
  }
})
```

## TODO

Make it all work!

## Testing

`npm test`

or simply `ava`

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