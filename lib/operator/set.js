'use strict'
exports.type = '$set'
exports.operator = function (val, stamp, operator, origin) {
  // fix it good
  // make weird merge type of thing here
  return operator.compute(val, stamp, origin)
}
