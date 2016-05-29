'use strict'
const Operator = require('./constructor')
const transform = new Operator(require('./transform'), false)
const time = new Operator(require('./time'), false)
const add = new Operator(require('./add'), false)
const prepend = new Operator(require('./prepend'), false)
const condition = new Operator(require('./condition'), false)
const type = new Operator(require('./type'), false)

exports.inject = require('./compute')

exports.properties = {
  $transform: transform,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend,
  $condition: condition
}

exports.types = {
  operator: Operator.prototype,
  $transform: transform,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend,
  $condition: condition
}
