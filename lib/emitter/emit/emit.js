'use strict'
// var execattach = require('./attach')

module.exports = function emit (emitter, bind, stamp, data) {

  // now lets add base and attach
  var fn = emitter.fn
  if (fn) {
    let keys = fn._keys || fn.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      fn[keys[i]].call(bind, data, stamp)
    }
  }
}
