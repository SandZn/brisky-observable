'use strict'
exports.type = '$prepend'
exports.operator = function (val, stamp, operator, origin) {
  return operator.compute(val, stamp, origin) + val
}
exports.Child = 'Constructor'
