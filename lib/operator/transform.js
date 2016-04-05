'use strict'
exports.type = '$transform'
exports.operator = function (val, stamp, operator, origin) {
  // object transform -- need to have soem form of cache -- what about a base???
  return operator.compute(val, stamp, origin)
}
