'use strict'
exports.type = '$prepend'
exports.operator = function (val, start, stamp, operator) {
  return operator.compute.call(this, operator.val, val, start, stamp, operator) + val
}
exports.child = 'Constructor'

