'use strict'
exports.type = '$time'
exports.operator = function (time, stamp, operator, origin) {
  var decimals = this.$time.compute(time, stamp, origin)
  var hrs = ~~(time / 3600)
  var mins = ~~((time % 3600) / 60)
  // @todo: to fixed is slow and unsupported
  var secs = decimals && decimals !== true ? (time % 60).toFixed(decimals) : ~~(time % 60)
  var ret = ''
  if (hrs > 0) ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret || 0
}
