// all you have to do in the out extension is case detect to traverse
// to inout or outin based on where you came in from
// (probably by checking the UUID/soul of the out node and making
// sure it is !== to where you just came from)
// and of course having another wrapper method around
// setting/adding edges would be nice too, maybe like gun.edge(data)
// to complement gun.out(property)

// oh, and of course don't forget to mark.spouse = edge; amber.spouse = edge
// (oh, and stupid comment, make sure to make edge have a edge.type = "edge"
// so you can type check against it internally and know it is an edge "node" not a
// regular node)
// (this is the primary reason edges aren't built into gun, cause there
// is nothing inherently "special" about them to warrant the entire database
// always having the overhead of an extra edge it has to jump through
// [slows down performance just slightly] unless it is explicitly needed/wanted)

// travels an edge to another node
// tests that the property is an edge

// gun.get('amber').get('spouse').get('outin').val(cb)

// shorthand
// gun.get('amber').out('spouse')

import Gun from 'gun/gun'

// get('spouse').get('inout').val(cb)
const calcOut = (selfId, edge, v) => {
  const inout = edge.get('inout')
  const propId = Gun.node.soul(v)
  // // only if not referencing to self
  if (propId !== selfId) {
    return inout
  } else {
    return edge.get('outin')
  }
}

export async function out(property) {
  console.log('OUT', property)
  const selfId = Gun.node.soul(this)
  const edge = this.get(property)

  const edgeNode = await edge.valAsync()
  let res = calcOut(selfId, edge, edgeNode)
  return await res.valueAsync()
}

// export const edge = (property, edge) => {
//   const gun = this

//   const name = edge.name
//   const from = edge.from
//   const to = edge.outin
//   console.log('add edge', edge, 'from', from, 'to', to)

//   from.put({
//     [name]: edge
//   })

//   to.put({
//     [name]: edge
//   })
// }