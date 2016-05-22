'use strict'
var Operator = require('./constructor')
var transform = new Operator(require('./transform'), false)
var set = new Operator(require('./set'), false)
var time = new Operator(require('./time'), false)
var add = new Operator(require('./add'), false)
var prepend = new Operator(require('./prepend'), false)
var condition = new Operator(require('./condition'), false)
var type = new Operator(require('./type'), false)

exports.properties = {
  $transform: transform,
  $set: set,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend,
  $condition: condition,
  cache: true
}

exports.types = {
  operator: Operator.prototype,
  $transform: transform,
  $set: set,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend,
  $condition: condition
}
