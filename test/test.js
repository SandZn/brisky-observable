'use strict'
// make this stuff into a util or seperate repo
exports.time = require('vigour-util/is/node')
  ? function (time) {
    if (time) {
      let end = process.hrtime(time)
      return end[0] * 1e6 + end[1] / 1e6
    } else {
      return process.hrtime()
    }
  }
  : function (time) {
    if (!time) {
      return global.performance.now()
    } else {
      return global.performance.now() - time
    }
  }

exports.perf = function (method, done, cnt) {
  if (!cnt) { cnt = 1 }
  exec(0, method, cnt, cnt, done, next)
}

function next (ms, method, cnt, total, done) {
  cnt--
  if (!cnt) {
    done(ms)
  } else {
    exec(ms, method, cnt, total, done)
  }
}

function exec (ms, method, cnt, total, done) {
  var time = exports.time()
  method()
  ms += exports.time(time)
  next(ms, method, cnt, total, done)
}
