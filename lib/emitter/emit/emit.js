'use strict'
var execAttach = require('./attach')
var execBase = require('./base')

module.exports = function emit (emitter, bind, val, stamp) {
  var fn = emitter.fn
  var attach = emitter.attach

  if (!bind.__c) {
    let base = emitter.base
    if (base) {
      execBase(base, emitter, bind, val, stamp)
    }
  }

  if (fn) {
    let keys = fn._keys || fn.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      fn[keys[i]].call(bind, val, stamp)
    }
  }

  if (attach) {
    execAttach(attach, emitter, bind, val, stamp)
  }
}
