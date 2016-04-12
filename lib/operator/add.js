'use strict'
exports.type = '$add'
exports.operator = function (val, stamp, operator, origin) {
  return val + operator.compute(void 0, val, stamp, origin)
}
exports.Child = 'Constructor'
