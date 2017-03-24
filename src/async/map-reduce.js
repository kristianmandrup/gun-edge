import {
  addMapReduce
} from '../map-reduce'

export function $mapReduce(node, options, putCb, opt) {
  return new Promise(function (resolve, reject) {
    node.mapReduce(options, resolve, putCb, opt)
  })
}

export function $addMapReduce(chain) {
  addMapReduce(chain)

  chain.$mapReduce = async function (options, putCb, opt) {
    return await $mapReduce(this, options, putCb, opt)
  }
  return chain
}