import {
  addValue
} from './value'

export function print(node, label, opt, inspector) {
  node.value(val => {
    label ? inspector(label, val) : inspector(val)
  }, opt)
}

export function addInspect({
  chain,
  Gun
}) {
  addValue(chain, Gun)
  const inspector = Gun.log || console.log

  chain.print = function (label, opt) {
    print(this, label, opt, inspector)
  }

  return chain
}