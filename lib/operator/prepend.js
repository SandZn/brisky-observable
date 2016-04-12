'use strict'
exports.type = '$prepend'
exports.operator = function (val, stamp, operator, origin) {
  return operator.compute(void 0, val, stamp, origin) + val
}
exports.Child = 'Constructor'
