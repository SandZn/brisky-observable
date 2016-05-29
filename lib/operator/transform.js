'use strict'
exports.type = '$transform'

exports.operator = function (val, start, stamp, operator) {
  var result = operator.compute.call(this, operator.val, val, start, stamp, operator)
  if (result && typeof result === 'object') {
    if (result.isBase) {
      return result
    } else {
      let r = new this.Constructor(void 0, false)
      r._operatorResult = true
      r.reset(false)
      r.set(result, false)
      return r
    }
  }
  return result
}
exports.child = 'Constructor'
