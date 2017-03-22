## Link DSL

```js
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
