## Link traversal (out)

`Mark` and `Amber` were `married in 2014`

Here we explore first:
- how we can model the graph
- how we can traverse the relationship efficiently

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
```