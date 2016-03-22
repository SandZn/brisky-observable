'use strict'
const DATA = 'data'

var Base = require('vigour-base')
// var Event = require('vigour-event')

var proto = Base.prototype
var set = proto.set
var addNewProperty = proto.addNewProperty

var cnt = 0
function stamp (stamp) {
  return stamp || ++cnt
}

module.exports = function (observable) {
  var Observable = observable.Constructor
  observable.define({
    handleReference (val, event, oldVal) {
      var valIsObservable = val instanceof Observable
      if (valIsObservable) {
        this.__input = val.on('data', this, void 0, void 0, event)
        this.emit('reference', oldVal, event)
        // return key or something
      }
      if (oldVal instanceof Observable) {
        // wrong...
        oldVal.off('data', { base: this })
        if (!valIsObservable) {
          this.emit('reference', oldVal, event)
        }
      }
    },
    // setValueInternal (val, event) {
    //   var oldVal = this.__input
    //   this.__input = val
    //   this.handleReference(val, event, oldVal)
    //   // this.emit('value', val, event) // this goes out
    //   return this
    // },
    set (val, event, nocontext, escape) {
      // var trigger
      if (event === void 0) {
        // trigger = true
        event = stamp() // new Event()
      }
      var base = set.call(this, val, event, nocontext, escape)
      // if (event) {
      if (base) {
        // key as last arguments
        base.emit(DATA, val, event)
      }
        // if (trigger) {
        //   event.trigger()
        // }
      // }
      return base
    },
    addNewProperty (key, val, property, event, escape) {
      var fireParentEvent = !this[key] || (val && val.useVal)
      addNewProperty.call(this, key, val, property, event, escape)
      if (event) {
        // also remove property event too much overhead again
        this.emit('property', key, event)
      }
      if (fireParentEvent && this[key] instanceof Observable) {
        // remove parent event as well
        this[key].emit('parent', this, event)
      }
    }
  })
}
