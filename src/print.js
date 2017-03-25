import {
  addValue
} from './value'

export function print(node, label, opt, log) {
  node.value(val => {
    label ? log(label, val) : log(val)
  }, opt)
}

export function addPrint({
  chain,
  Gun
}) {
  addValue(chain, Gun)
  const log = Gun.log || console.log

  chain.print = function (label, opt) {
    print(this, label, opt, log)
  }

  return chain
}