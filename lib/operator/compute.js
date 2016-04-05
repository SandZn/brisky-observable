'use strict'
var compute = require('vigour-base').prototype.compute

exports.define = {
  compute (previousVal, event, origin) {
    // this._operators = null
    console.log('#COMPUTE:', this.type)
    var operators = this.keys('_operators')
    var val = compute.call(this, previousVal, event, origin)
    // remove _type make it .type simple better
    console.log('letz compute', this.type, this.$add && this.$add.keyType)
    if (operators) {
      for (let i in operators) {
        let operator = this[operators[i]]
        resolveOperatorContext(operator, this)
        let bind = operator.getBind() // do not like bind will be refactored soon
        if (bind) {
          val = operator.operator.call(bind, val, event, operator, origin)
        }
        operator.clearContext() // this is unclear try to remoe it
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
