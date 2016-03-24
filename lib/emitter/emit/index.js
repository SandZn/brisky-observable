'use strict'
var emitContext = require('./context')
var emit = require('./emit')
var Base = require('vigour-base')
var emitInstances = require('./instances')

exports.define = {
  generateConstructor () {
    return function Emitter (val, stamp, parent, key, escape) {
      if (!this.e) { this.e = emitInstances.get(key) }
      return Base.apply(this, arguments)
    }
  },
  emit (bind, stamp, val) {
    let parent = bind._parent
    if (parent) {
      let context = bind._c
      if (!bind.noContext) {
        emitContext(parent, bind, stamp, val, this, context)
        bind.clearContextUp(bind._cLevel)
      }
      if (!context) {
        let instances = bind._i
        this.e(instances, bind, stamp, val)
        emit(this, bind, stamp, val)
      }
    } else {
      let instances = bind._i
      if (instances) {
        this.e(instances, bind, stamp, val)
      }
      emit(this, bind, stamp, val)
    }
  }
}

// exports.define = {
//   emit (bind, stamp, data) {
//     emit(this, bind, stamp, data)
//   }
// }
