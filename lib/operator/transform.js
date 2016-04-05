'use strict'
exports.type = '$transform'
exports.operator = function (val, stamp, operator, origin) {
  // object transform -- need to have soem form of cache -- probbly an observable
  var result = operator.compute(val, stamp, origin)
  if (result && typeof result === 'object') {
    // pretty difficult cache
    if (result._base_version) {
      return result
    } else {
      let r = new this.Constructor(void 0, false)
      r._operatorResult = true
      r.clear(false) // this is the difference between transform and set
      r.set(result, false)
      return r
    }
  }
  return result
}
exports.Child = 'Constructor'
