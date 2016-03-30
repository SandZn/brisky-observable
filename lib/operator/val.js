'use strict'
var compute = require('vigour-base').prototype.compute

exports.define = {
  compute (previousValue, event, origin, start, end, val) {
    val = compute.call(this, previousValue, event, origin)
    return parseOperatorsDefault.call(this, val, event, origin)
  }
}

exports._keylists = [ '_keys', '_operators' ]

function isOperator (val, key) {
  return val[key] && val[key]._operator
}

function parseOperatorsDefault (val, event, origin) {
  var operators = this.keys('_operators', isOperator)
  if (operators) {
    for (let i in operators) {
      let operator = this[operators[i]]
      resolveOperatorContext(operator, this)
      let bind = operator.getBind()
      if (bind) {
        val = operator._operator.call(bind, val, event, operator, origin)
      }
      operator.clearContext()
    }
  }
  return val
}

function resolveOperatorContext (operator, parent) {
  if (operator._parent !== parent) {
    operator.__c = parent
    operator._cLevel = 1
  } else if (parent.__c) {
    operator.__c = parent.__c
    operator._cLevel = parent._cLevel + 1
  }
}
