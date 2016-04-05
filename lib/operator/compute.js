'use strict'
var compute = require('vigour-base').prototype.compute

exports.define = {
  compute (previousVal, event, origin) {
    console.log('#COMPUTE:', this.type)
    var operators = this.keys('_operators')
    var val = compute.call(this, previousVal, event, origin)
    if (operators) {
      for (let i in operators) {
        let operator = this[operators[i]]
        resolveOperatorContext(operator, this)
        let bind = operator.getBind() // do not like bind will be refactored soon
        if (bind) {
          val = operator.operator.call(bind, val, event, operator, origin)
        }
        operator.clearContext() // this is unclear try to remove it
      }
    }
    return val
  }
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
