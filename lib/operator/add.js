'use strict'
var Operator = require('./')

exports.properties = {
  $add: new Operator({
    operator (val, stamp, operator, origin) {
      return val + operator.compute(val, stamp, origin)
    },
    Child: 'Constructor'
  })
}
