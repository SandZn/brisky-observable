'use strict'
exports.type = '$add'
exports.operator = function (val, stamp, operator, origin) {
  return val + operator.compute(val, stamp, origin)
}
exports.Child = 'Constructor'
