'use stirct'
exports.type = '$'
exports.operator = function (val, stamp, operator, origin) {
  console.log('subscribe operator')
  // very very important
  // var condition = operator.compute(val, stamp, origin)
  // return condition ? val : void 0
  return val // re-read element to similair stuff how the thunk handler handlers ti
}
