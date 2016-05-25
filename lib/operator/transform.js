'use strict'
exports.type = '$transform'
exports.operator = function (val, stamp, operator, origin) {
  // object transform -- need to have soem form of cache -- probbly an observable
  var result = operator.compute(void 0, val, stamp, origin)
  if (result && typeof result === 'object') {
    // pretty difficult cache
    if (result.isBase) {
      return result
    } else {
      let r = new this.Constructor(void 0, false)
      r._operatorResult = true
      r.reset(false) // this is the difference between transform and set
      r.set(result, false)
      return r
    }
  }
  return result
}
exports.child = 'Constructor'
