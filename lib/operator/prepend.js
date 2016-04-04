'use strict'
var Operator = require('./')

exports.properties = {
  $prepend: new Operator({
    operator (val, event, operator, origin) {
      return operator.compute(val, event, origin) + val
    },
    Child: 'Constructor'
  })
}
