import {
  addRx
} from './rx'
import {
  addXStream
} from './xstream'
import {
  addZen
} from './zen'

const chains = {
  addXStream,
  addRx,
  addZen
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
}

const allNames = [
  'rx',
  'xStream',
  'zen'
]

export function $addObservable({
  Gun
}) {
  add(Gun, ...allNames)
}

export default $addObservable