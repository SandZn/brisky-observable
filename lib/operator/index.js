'use strict'
var Operator = require('./Constructor')

// object level operators
var transform = new Operator(require('./transform'), false)
var set = new Operator(require('./set'), false)

// straight operators
var time = new Operator(require('./time'), false)
var type = new Operator(require('./type'), false)
var add = new Operator(require('./add'), false)
var prepend = new Operator(require('./prepend'), false)

// batch the creation of the property function for these ones
exports.properties = {
  $transform: transform,
  $set: set,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend
}

// maybe just use this for all of them is perhaps a cleaner way?
// what about not making them properties? just use type everywhere
// remove: altogehter? just use components/types ??? wtf not?
exports.components = {
  operator: Operator.prototype,
  $transform: transform,
  $set: set,
  $time: time,
  $type: type,
  $add: add,
  $prepend: prepend
}

exports.inject = require('./compute')
