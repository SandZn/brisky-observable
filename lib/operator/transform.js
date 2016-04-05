'use strict'
exports.type = '$transform'
exports.operator = function (val, stamp, operator, origin) {
  // object transform -- need to have soem form of cache -- probbly an observable
  // stuff we checked last june -- finish this toda
  return operator.compute(val, stamp, origin)
}
