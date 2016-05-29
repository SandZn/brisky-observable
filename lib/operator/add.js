'use strict'
exports.type = '$add'

// exports.operator = function (val, start, stamp, operator, attach) {
  // var result = operator.compute.call(this, void 0, val, start, stamp, attach)

exports.operator = function (val, start, stamp, operator) {
  return val + operator.compute.call(this, operator.val, val, start, stamp, operator)
}
exports.child = 'Constructor'
