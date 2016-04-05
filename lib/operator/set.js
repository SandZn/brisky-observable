'use strict'
exports.type = '$set'
exports.operator = function (val, stamp, operator, origin) {
  // fix it good
  // make weird merge type of thing here
  var set = operator.compute(val, stamp, origin)

  return set
}
