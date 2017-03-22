import Gun from 'gun/gun'
import test from 'ava'
import '../src'

let mark = {
  name: "mark"
};

let amber = {
  name: "amber"
};

mark.spouse = edge
amber.spouse = edge

let edge = {
  type: 'edge',
  year: 2014,
  in: mark,
  out: amber
}

// The GOAL

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

// The goal of a gun extension is to make this
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

// MY EXPERIMENTS
const gun = Gun();
const amber = gun.get('person/amber').put(amber)
const mark = gun.get('person/mark').put(mark)

test('full edge', t => {
  const amber = gun.get('person/amber').put(amber)
  let edge = gun.edge('married', edge)

  t.is(amber.married.year, edge.year)
  t.is(mark.married.year, edge.year)
})

test('out makes connection to node referenced', t => {
  let edgeNode = amber.out('person/mark')
  t.is(edgeNode, mark)
})