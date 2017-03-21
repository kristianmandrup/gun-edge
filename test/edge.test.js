import Gun from 'gun/gun'
import test from 'ava'
import '../src'

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

test('out', t => {
  const amber = gun.get('person/amber').put(amber)
  amber.out('married').get('person/mark').put(mark)
  t.is(1, 1)
})

test('simple in', t => {
  const amber = gun.get('people').set(amber)
  amber.in('married', mark)
  t.is(1, 1)
})

test('in with key', t => {
  const amber = gun.get('person/amber').put(amber)
  amber.in('married', {
    mark: 'person/mark'
  })
  t.is(1, 1)
})

test('in with edge', t => {
  const amber = gun.get('person/amber').put(amber)
  amber.in(edge, {
    mark: 'person/mark'
  })
  t.is(1, 1)
})

test('edge', t => {
  const amber = gun.get('person/amber').put(amber)
  amber.edge(edge).get('person/mark').put(mark)
  t.is(1, 1)
})

test('full edge', t => {
  const amber = gun.get('person/alice').put(amber)
  amber.edge(fullEdge)

  t.is(1, 1)
})