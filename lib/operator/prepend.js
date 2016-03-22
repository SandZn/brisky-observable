'use strict'
var Operator = require('./')

exports.inject = require('./val')

exports.properties = {
  $prepend: new Operator({
    key: '$prepend',
    operator (val, event, operator, origin) {
      return operator.compute(val, event, origin) + val
    },
    Child: 'Constructor'
  })
}
