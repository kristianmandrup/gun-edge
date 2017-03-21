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

export const out = (property, edge) => {
  const gun = this
  const self = gun.back()
  const selfId = Gun.node.soul(self)
  let to = self

  console.log('property', property)
  console.log('self', self, selfId)

  return gun.get(property).val((data) => {
    const propId = Gun.node.soul(data)
    console.log('soul prop', propId)
    // only if not referencing to self
    if (propId !== selfId) {
      // add the edge
      if (edge.type == 'edge') {
        edge.inout
      }
      const to = gun.back()

    }
  })
  return edge.get(to)
}

export const edge = (edge) => {
  const gun = this
  const from = gun.back()
  console.log('add edge', edge, 'from', from)
}