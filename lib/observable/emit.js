'use strict'
const vstamp = require('vigour-stamp')
const emitinstances = require('./emitinstances').universal

exports.define = {
  emit (key, val, stamp, ignore) {
    var created
    if (stamp === void 0) {
      stamp = vstamp.create()
      created = true
    }
    let _key = '_' + key
    var on = this.__on
    var emitter = on[_key] || on[key]
    if (emitter) {
      emitter.emit(this, stamp, val)
    } else if (this._i) {
      emitinstances(this._i, _key, key, val, stamp)
    }
    if (created) {
      vstamp.close(stamp)
    }
  }
}

