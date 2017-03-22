// Import the gun library
var Gun = require('gun');

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

console.log('AMBER', amber)
console.log('EDGE', edge)
console.log('MARK', mark)

const cb = (val) => {
  console.log(val)
}

gun.get('amber').get('spouse').get('outin').val(cb)

// shorthand
// gun.get('amber').out('spouse')

gun.get('mark').get('spouse').get('inout').val(cb)
// shorthand
// gun.get('mark').out('spouse')