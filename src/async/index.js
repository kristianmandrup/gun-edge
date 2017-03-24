import {
  $addFields
} from './fields'
import {
  $addMap
} from './map'
import {
  $addMapReduce
} from './map-reduce'
import {
  $addVal
} from './val'
import {
  $addValue
} from './value'
import {
  $addLive
} from './live'
import {
  $addOn
} from './on'


const chains = {
  $addFields,
  $addMap,
  $addMapReduce,
  $addVal,
  $addValue,
  $addLive,
  $addOn
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function add(Gun, ...names) {
  names.forEach(name => {
    let nameCap = capitalize(name)
    chains['$add' + nameCap](Gun.chain, Gun)
  })
}

const allNames = [
  'fields',
  'map',
  'mapReduce',
  'val',
  'value',
  'live',
  'on'
]

export function $addAll(Gun) {
  add(Gun, ...allNames)
}

export default $addAll