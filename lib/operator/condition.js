'use strict'
exports.type = '$condition'
exports.operator = function (val, stamp, operator, origin) {
  console.log('condition operators')
  var condition = operator.compute(val, stamp, origin)
  return condition ? val : void 0
}
