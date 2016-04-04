'use strict'
var Base = require('vigour-base')
exports.define = {
  once (val, key, unique, event) {
    var emitter = this
    var once
    if (typeof val === 'function') {
      once = function (data, event) {
        emitter.clearContext()
        emitter.off(once)
        val.call(this, data, event)
      }
    } else if (val instanceof Base) {
      let type = this.key
      once = function (data, event) {
        emitter.off(once)
        val.emit(type, data, event)
      }
    } else if (val instanceof Array) {
      throw new Error('attach in once is temporarly disabled')
    }
    return this.on(once, key, unique, event)
  }
}
