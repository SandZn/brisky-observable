'use strict'
var compute = require('vigour-base').prototype.compute
const OPERATORS = '_operators'

exports.define = {
  compute (val, previousVal, stamp, origin) {
    val = compute.call(this, val, previousVal, stamp, origin)
    var operators = this.keysInternal(this._operators, OPERATORS, this.keysCheckField)
    if (operators) {
      val = computeOperators(operators, this, val, stamp, origin)
    }
    if (val === void 0 && this.keyType !== OPERATORS) { val = this }
    return val
  }
}

function setContext (operator, parent) {
  if (operator._parent !== parent) {
    operator.__c = parent
    operator._cLevel = 1
  } else if (parent.__c) {
    operator.__c = parent.__c
    operator._cLevel = parent._cLevel + 1
  }
}

function computeOperators (operators, observable, val, stamp, origin) {
  if (!observable._operatorResult) {
    for (let i = 0, len = operators.length; i < len; i++) {
      let operator = observable[operators[i]]
      // will require some perf
      let origc = operator.__c
      let l
      if (origc) { l = operator._cLevel }
      setContext(operator, observable)
      // trying to get rid of getBind saves A LOT of speed
      let bind = operator.getBind()
      let calc = operator.operator.call(bind, val, stamp, operator, origin)
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
