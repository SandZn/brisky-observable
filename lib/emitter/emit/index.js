'use strict'
var emitContext = require('./context')
var emit = require('./emit')
var Base = require('vigour-base')
var emitInstances = require('./instances')

exports.define = {
  generateConstructor () {
    return function Emitter (val, stamp, parent, key, escape) {
      this._k = '_' + key
      return Base.apply(this, arguments)
    }
  },
  eInstances: emitInstances.universal,
  // state will use this simple emit function
  // can make this into a setting
  // emit (bind, stamp, val) {
  //   var instances = bind._i
  //   if (instances) {
  //     this.eInstances(instances, bind, stamp, val)
  //   }
  //   emit(this, bind, stamp, val)
  // }
  emit (bind, stamp, val) {
    let parent = bind._parent
    if (parent) {
      let context = bind._c
      if (!bind.noContext) {
        emitContext(parent, bind, stamp, val, this, context)
        if (!context && bind._c) {
          // 10 double check this
          bind.clearContextUp(bind._cLevel)
        }
      }
      if (!context) {
        let instances = bind._i
        if (instances) {
          this.eInstances(instances, bind, stamp, val)
        }
        emit(this, bind, stamp, val)
      }
    } else {
      let instances = bind._i
      if (instances) {
        this.eInstances(instances, bind, stamp, val)
      }
      emit(this, bind, stamp, val)
    }
  }
}
