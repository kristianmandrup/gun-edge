import {
  $addLive
} from './live'
import {
  $addOn
} from './on'
import {
  $addMap
} from './map'

const chains = {
  $addLive,
  $addMap,
  $addOn,
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
  'live',
  'map',
  'on'
]

export function $addGen({
  Gun
}) {
  add(Gun, ...allNames)
}

export default $addGen