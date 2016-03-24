'use strict'
const PROPERTY = 'property'
const Base = require('vigour-base')
const vstamp = require('vigour-stamp')
const proto = Base.prototype
const set = proto.set
const addNewProperty = proto.addNewProperty
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
      var oldVal = this.val
      this.val = val
      this.handleReference(val, stamp, oldVal)
      return this
    },
    set (val, stamp, nocontext, escape) {
      var created
      if (stamp === void 0) {
        created = true
        stamp = vstamp.create()
      }
      const base = set.call(this, val, stamp, nocontext, escape)
      if (stamp) {
        if (base) {
          let on = this.__on
          let emitter = on._data || on.data
          if (emitter) {
            emitter.emit(this, stamp, val)
          } else if (this._i) {
            emitinstances(this._i, stamp, val)
          }
        }
        if (created) { vstamp.close(stamp) }
      }
      return base
    },
    addNewProperty (key, val, property, stamp, escape) {
      addNewProperty.call(this, key, val, property, stamp, escape)
      // also handle this special
      if (stamp) { this.emit(PROPERTY, key, stamp) }
    }
  })
}
