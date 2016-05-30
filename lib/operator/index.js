'use strict'
const Operator = require('./constructor')
const transform = new Operator(require('./transform'), false)
const add = new Operator(require('./add'), false)
const prepend = new Operator(require('./prepend'), false)
const type = new Operator(require('./type'), false)

exports.inject = require('./compute')

exports.properties = {
  $transform: transform,
  $type: type,
  $add: add,
  $prepend: prepend
}

exports.types = {
  operator: Operator.prototype,
  $transform: transform,
  $type: type,
  $add: add,
  $prepend: prepend
}
