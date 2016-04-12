'use strict'
exports.type = '$condition'
exports.operator = function (val, stamp, operator, origin) {
  var condition = operator.compute(void 0, val, stamp, origin)
  if (typeof condition === 'object' || !condition) {
    return null
  } else {
    return val
  }
}
