'use strict'
const Base = require('vigour-base')
const vstamp = require('vigour-stamp')
const proto = Base.prototype
const set = proto.set
const emitinstances = require('./emitinstances').data

module.exports = function (observable) {
  const Observable = observable.Constructor
  observable.define({
    handleReference (val, stamp, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this.val = val.on('data', this, void 0, void 0, stamp)
      }
      if (oldVal instanceof Observable) {
        oldVal.off('data', { base: this })
      }
    },
    setValueInternal (val, stamp) {
      const oldVal = this.val
      this.val = val
      this.handleReference(val, stamp, oldVal)
      return this
    },
    set (val, stamp, nocontext, newobs) {
      var created
      if (stamp === void 0) {
        created = true
        stamp = vstamp.create()
      }
      // can make this faster need to check speed of the newobs part
      const base = set.call(this, val, stamp, nocontext) || (newobs && this)
      if (stamp) {
        if (base) {
          let on = base._emitters
          let emitter = on._data || on.data
          if (emitter) {
            emitter.emit(base, val, stamp)
          } else if (base._i) {
            emitinstances(base._i, val, stamp)
          }
        }
        if (created) {
          vstamp.close(stamp)
        }
      }
      return base
    }
  })
}
