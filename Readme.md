# Gun edge

Edge DSL for [Gun.js](http://gun.js.org/)

## Install

`npm i gun-edge`

## Case study

`Mark` and `Amber` were `married in 2014`

The `gun-edge` DSL tries to facilitate making such a relationship in a Gun graph

### Using the DSL

PS: The following most likely full of misunderstanding... just the general gist of where we would like to go ;)

```js
import 'gun-edge'

let mark = {
  name: "mark"
};
let amber = {
  name: "amber"
};

let edge = {
  type: 'edge',
  married: 2014,
}

mark.spouse = edge
amber.spouse = edge

let fullEdge = {
  type: 'edge',
  married: 2014,
  inout: mark,
  outin: amber
}

const gun = Gun();

// add :out directed edge from amber to mark with simple 'married' edge
const amber = gun.get('person/amber').put(amber)
amber.out('married').get('person/mark').put(mark)

// add :in directed edge from amber back to mark via :married edge
const amber = gun.get('people').set(amber)
amber.in('married', mark)

// add :in directed edge from amber back to mark (with key) via :married edge

const amber = gun.get('person/amber').put(amber)
amber.in('married', {
  mark: 'person/mark'
})

// add :in directed edge from amber back to mark via :married edge
const amber = gun.get('person/amber').put(amber)
amber.in(edge, {
  mark: 'person/mark'
})

// add :married edge between mark and amber

// using minimal edge info
const amber = gun.get('person/amber').put(amber)
amber.edge(edge).get('person/mark').put(mark)

// add :married edge between mark and amber
// using
const amber = gun.get('person/alice').put(amber)
amber.edge(fullEdge)
```

## TODO

Make it work!

## License

ISC