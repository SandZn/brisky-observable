'use strict'
const vstamp = require('vigour-stamp')
const emitinstances = require('./emitinstances').universal
exports.define = {
  emit (key, val, stamp) {
    var created
    if (stamp === void 0) {
      stamp = vstamp.create()
      created = true
    }
    if (stamp) {
      let _key = '_' + key
      let on = this._emitters
      let emitter = on[_key] || on[key]
      if (emitter) {
        emitter.emit(this, val, stamp)
      } else if (this.instances) {
        emitinstances(this.instances, _key, key, stamp, val)
      }
      if (created) { vstamp.close(stamp) }
    }
  }
}
