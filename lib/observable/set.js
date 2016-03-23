'use strict'
const DATA = 'data'
const PROPERTY = 'property'
var Base = require('vigour-base')
var vstamp = require('vigour-stamp')
var proto = Base.prototype
var set = proto.set
var addNewProperty = proto.addNewProperty

module.exports = function (observable) {
  var Observable = observable.Constructor
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
      var base = set.call(this, val, stamp, nocontext, escape)
      if (stamp) {
        if (base) { this.emit(DATA, val, stamp) }
        if (created) { vstamp.close(stamp) }
      }
      return base
    },
    addNewProperty (key, val, property, stamp, escape) {
      addNewProperty.call(this, key, val, property, stamp, escape)
      if (stamp) { this.emit(PROPERTY, key, stamp) }
    }
  })
}
