'use strict'
const vstamp = require('vigour-stamp')
const emitinstances = require('./emitinstances').universal

exports.define = {
  emit (key, val, stamp, ignore) {
    if (stamp !== false) {
      let created
      let _key = '_' + key
      let on = this.__on
      let emitter = on[_key] || on[key]
      if (stamp === void 0) {
        stamp = vstamp.create()
        created = true
      }
      if (emitter) {
        emitter.emit(this, stamp, val)
      } else if (this._i) {
        emitinstances(this._i, _key, key, val, stamp)
      }
      if (created) { vstamp.close(stamp) }
    }
  }
}

