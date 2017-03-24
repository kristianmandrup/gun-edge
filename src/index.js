import {
  add,
  default as addAll
} from './all'

export {
  add,
  addAll
}

export default function (Gun) {
  Gun.chainAll = function (...funs) {
    funs.forEach(fun => fun(Gun.chain, Gun))
  }
  return addAll(Gun)
}