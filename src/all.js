import {
  $addAll as addAsync
} from './async'

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
  addValue
} from './value'

const chains = {
  addAsync,
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
  addRecurse,
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
  'async',
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
  'recurse',
  'value'
]

export {
  addAsync,
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
  addRecurse,
  addValue
}

export default function (Gun) {
  return add(Gun, ...allNames)
}