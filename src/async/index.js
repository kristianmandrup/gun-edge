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
import {
  $addNo
} from './no'
import {
  $addRecurse
} from './recurse'

const chains = {
  $addFields,
  $addLive,
  $addMap,
  $addMapReduce,
  $addOn,
  $addNo,
  $addRecurse,
  $addVal,
  $addValue
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function add(Gun, ...names) {
  names.forEach(name => {
    let nameCap = capitalize(name)
    let fun = '$add' + nameCap
    chains[fun]({
      chain: Gun.chain,
      Gun
    })
  })
}

const allNames = [
  'fields',
  'map',
  'mapReduce',
  'val',
  'value',
  'live',
  'on',
  'no',
  'recurse'
]

export function $addAll({
  Gun
}) {
  add(Gun, ...allNames)
}

export default $addAll