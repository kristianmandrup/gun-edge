import Gun from 'gun/gun'
import './value'

const instOf = (clazz = Object) => {
  return (val) => {
    return val instanceof clazz
  }
}

const notOriginator = (selfId) => {
  return data => selfid !== Gun.node.soul(data)
}

// get('spouse').get('inout').val(cb)
async function calcOut(selfId, out, edge, v) {
  const def = edge.get(out)
  const propId = Gun.node.soul(v)
  // // only if not referencing to self
  if (propId !== selfId) {
    return def
  } else {
    // find first other property that references a valid Object
    return mapReduce(edge, {
      filters: [instOf(Object), notOriginator(selfId)]
    })
  }
}

/*
await gun.get('mark').out({
  spouse: 'bride'
})
*/
export async function out(navigation) {
  if (typeof navigation === 'string') {
    navigation = {
      [navigation]: navigation
    }
  }
  const key = Object.keys(navigation)[0]
  const out = Object.values(navigation)[0]

  const selfId = Gun.node.soul(this)
  const edge = this.get(key)

  const edgeNode = await edge.valAsync()
  let res = calcOut(selfId, out, edge, edgeNode)
  return await res.valueAsync()
}