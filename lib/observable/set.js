'use strict'
const vstamp = require('vigour-stamp')
const emitinstances = require('./emitinstances').data

exports.define = {
  handleReference (val, stamp, oldVal) {
    var valIsObservable = typeof val === 'object' && 'isObservable' in val
    if (valIsObservable) {
      this.val = val.on('data', this, void 0, void 0, stamp)
    }
    if (oldVal && typeof oldVal === 'object' && 'isObservable' in oldVal) {
      oldVal.off('data', { base: this })
    }
  },
  setValueInternal (val, stamp) {
    const oldVal = this.val
    this.val = val
    this.handleReference(val, stamp, oldVal)
    return this
  },
  extend: {
    set (set, val, stamp, nocontext, isNew) {
      var created
      if (stamp === void 0) {
        created = true
        stamp = vstamp.create()
      }
      const base = set.call(this, val, stamp, nocontext) || (isNew && this)
      if (stamp) {
        if (base) {
          let on = base._emitters
          let emitter = on._data || on.data
          if (emitter) {
            emitter.emit(base, val, stamp)
          } else if (base.instances) {
            emitinstances(base.instances, val, stamp)
          }
        }
        if (created) {
          vstamp.close(stamp)
        }
      }
      return base
    }
  }
}
