'use strict'
var execattach = require('./attach')
var emitInstances = require('./instances')
var emitContext = require('./context')

function emit (emitter, bind, stamp, data) {
  var fn = emitter.fn
  if (fn) {
    let keys = fn._keys || fn.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      fn[keys[i]].call(bind, data, stamp)
    }
  }
}

exports.define = {
  emit (bind, stamp, data) {
    emit(this, bind, stamp, data)
  }
}
