import {
  addAll
} from './all'

export default function (Gun) {
  Gun.chainAll = function (...funs) {
    funs.forEach(fun => fun(Gun.chain, Gun))
  }
  return addAll(Gun)
}