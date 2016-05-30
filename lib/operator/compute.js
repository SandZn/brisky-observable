'use strict'
// all these things can be set using extend
const compute = require('vigour-base').prototype.compute

exports.define = {
  compute (val, previous, start, stamp, attach) {
    const target = attach || this
    val = compute.call(this, val, previous, start, stamp, attach)
    const operators = (target._keys.length > 1) && target.keys('operator')
    if (operators) {
      if (!start && val) { start = val }
      val = computeOperators(operators, this, val, start, stamp, attach)
    }
    if (val === void 0 && !('isOperator' in target)) { val = target }
    return val
  }
}

function setContext (operator, parent) {
  // so parent is the same -- but parent is in context
  if (operator._parent !== parent) {
    operator.__c = parent
    operator._cLevel = 1
  } else if (parent.__c) {
    operator.__c = parent.__c
    operator._cLevel = parent._cLevel + 1
  }
}

function computeOperators (operators, observable, val, start, stamp, attach) {
  const target = attach || observable
  if (!target._operatorResult) {
    for (let i = 0, len = operators.length; i < len; i++) {
      let operator = target[operators[i]]
      let origc = operator.__c
      let l
      if (origc) { l = operator._cLevel }
      setContext(operator, observable)
      let calc = operator.operator.call(observable, val, start, stamp, operator)
      if (origc) {
        operator.__c = origc
        operator._cLevel = l
      }
      if (calc === null) {
        val = void 0
      } else if (calc !== void 0) {
        val = calc
      }
    }
  }
  return val
}
