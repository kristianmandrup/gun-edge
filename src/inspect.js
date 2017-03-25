import {
  value
} from './value'

export function inspect(node, label) {
  value(node, (val => {
    label ? console.log(label, val) : console.log(val)
  }), opt)
}

export function addInspect({
  chain,
  Gun
}) {
  // addValue(chain, Gun)

  chain.inspect = function (label) {
    inspect(this, label)
  }

  return chain
}