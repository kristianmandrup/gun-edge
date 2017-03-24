export function $fields(node) {
  return new Promise(function (resolve, reject) {
    node.value(v => resolve(Object.keys(v)))
  });
}

import {
  addValue
} from '../value'

export function $addFields(chain, Gun) {
  addValue(chain, Gun)

  chain.$fields = function (cb, opt) {
    return $fields(this, cb, opt)
  }
  return chain
}