'use strict'
const execAttach = require('./attach')
const execBase = require('./base')

module.exports = function emit (emitter, bind, val, stamp) {
  const fn = emitter.fn
  const attach = emitter.attach
  if (!bind.__c) {
    let base = emitter.base
    if (base) {
      execBase(base, emitter, bind, val, stamp)
    }
  }

  if (fn) {
    const keys = fn._keys
    for (let i = 0, len = keys.length; i < len; i++) {
      let target = fn[keys[i]]
      if (target) {
        target.call(bind, val, stamp)
      }
    }
  }

  if (attach) {
    execAttach(attach, emitter, bind, val, stamp)
  }
}
