'use strict'
var Operator = require('./')

exports.properties = {
  $transform: new Operator({
    type: '$transform',
    operator: function (val, event, operator, origin) {
      return operator.compute(val, event, origin)
    },
    Child: 'Constructor'
  })
}
