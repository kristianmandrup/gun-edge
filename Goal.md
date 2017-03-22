## Goal

```js
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
```