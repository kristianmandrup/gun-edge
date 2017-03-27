import {
  $addAll as addPromise
} from './promise'

import {
  addCount
} from './count'
import {
  addDate
} from './date'
import {
  addEach
} from './each'
// import { addEdge } from './edge'

import {
  addFields
} from './fields'
// import {
//   addFilter
// } from './filter'
import {
  addPrint
} from './print'
import {
  addLive
} from './live'
import {
  addTimed
} from './timed'
import {
  addLocal
} from './local'
import {
  addMapReduce
} from './map-reduce'
import {
  addNo
} from './no'
// import {
//   addOut
// } from './out'
import {
  addRecurse
} from './recurse'
import {
  addPut
} from './put'
import {
  addSet
} from './set'
import {
  addSoul
} from './soul'
import {
  addValue
} from './value'

const chains = {
  addPromise,
  addCount,
  addDate,
  addEach,
  addFields,
  addPrint,
  addLive,
  addTimed,
  addLocal,
  addMapReduce,
  addNo,
  addPut,
  addRecurse,
  addSet,
  addSoul,
  addValue
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function add(Gun, ...names) {
  names.forEach(name => {
    let nameCap = capitalize(name)
    let fun = 'add' + nameCap
    chains[fun]({
      chain: Gun.chain,
      Gun
    })
  })
  return Gun
}

const allNames = [
  'promise',
  'date',
  'each',
  'fields',
  // 'filter',
  'print',
  'live',
  'timed',
  'local',
  'mapReduce',
  'no',
  // 'out',
  'put',
  'recurse',
  'set',
  'soul',
  'value'
]

export {
  addPromise,
  addDate,
  addEach,
  addFields,
  // addFilter,
  addPrint,
  addLive,
  addTimed,
  addLocal,
  addMapReduce,
  addNo,
  // addOut,
  addPut,
  addRecurse,
  addSet,
  addValue
}

export default function (Gun) {
  return add(Gun, ...allNames)
}