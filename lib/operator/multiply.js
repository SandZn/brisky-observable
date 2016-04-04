'use strict'
var Operator = require('./')

exports.properties = {
  $multiply: new Operator({
    operator: function (val, event, operator, origin) {
      return val * operator.compute(val, event, origin)
    },
    Child: 'Constructor'
  })
}
