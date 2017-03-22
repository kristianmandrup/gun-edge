import Gun from 'gun/gun'
import test from 'ava'
import '../src'

const gun = Gun();

var amber = gun.get('amber').put({
  name: "amber"
});
var mark = gun.get('mark').put({
  name: "mark"
});
var edge = gun.put({
  married: 2014
});

import '../src/value'
import '../src/async/val'

const cb = node => node

edge.get('inout').put(amber);
edge.get('outin').put(mark);
amber.get('spouse').put(edge);
mark.get('spouse').put(edge);

Gun.chain.valAsync = function (opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.val(resolve, opt)
  });
}

Gun.chain.valueAsync = function (opt) {
  var self = this
  return new Promise(function (resolve, reject) {
    self.value(resolve, opt)
  });
}

// test('valueAsync', async t => {
//   let amberAwait = await gun.get('mark').get('spouse').get('inout').valueAsync()
//   let amberThen = gun.get('mark').get('spouse').get('inout').valueAsync()
//     .then(v => {
//       console.log('value', v)
//       t.is(amberAwait, v)
//     })
//   console.log('amberAwait', amberAwait)
//   t.is(amberAwait.name, 'amber')
// })

// import '../src/filter'

// test('filter', async t => {
//   // return a reference to amber.
//   let colors = gun.get('colors').put({
//     violet: true,
//     red: true,
//     green: false
//   }) //.valueAsync()

//   let goodColors = await colors.filter(c => c === true)
//   console.log('goodColors', goodColors)

// })

// test('out', async t => {
//   // return a reference to amber.
//   let amberLong = await gun.get('mark').get('spouse').get('inout').valueAsync()
//   let amberShort = await gun.get('mark').out({
//     spouse: 'inout'
//   })
//   console.log('long', amberLong)
//   console.log('short', amberShort)
//   t.is(amberLong, amberShort)
// })