'use strict'
var Operator = require('./constructor')
var transform = new Operator(require('./transform'), false)
var set = new Operator(require('./set'), false)
var time = new Operator(require('./time'), false)
var add = new Operator(require('./add'), false)
var prepend = new Operator(require('./prepend'), false)
var condition = new Operator(require('./condition'), false)
var type = new Operator(require('./type'), false)

module.exports = function (obs) {
  exports.properties = {
    $transform: transform,
    $set: set,
    $time: time,
    $type: type,
    $add: add,
    $prepend: prepend,
    $condition: condition
  }

  exports.components = {
    operator: Operator.prototype,
    $transform: transform,
    $set: set,
    $time: time,
    $type: type,
    $add: add,
    $prepend: prepend,
    $condition: condition
  }

  obs.set(exports, false)

  // temp dirty hack before i figured out a way to update the keys in instances
  // another idea is before you set props it generates the probs not the first time -- nope outside of hcpath
  require('vigour-base/lib/set/property/definition/map')(Operator.prototype)
}
