'use strict'
const emitContext = require('./context')
const emit = require('./emit')
const Base = require('vigour-base')
const emitInstances = require('./instances')

exports.define = {
  generateConstructor () {
    return function Emitter (val, stamp, parent, key) {
      this._k = '_' + key
      return Base.apply(this, arguments)
    }
  },
  eInstances: emitInstances.universal,
  emit (bind, val, stamp) {
    const parent = bind._parent
    if (parent) {
      const context = bind.__c
      if (!bind.noContext) {
        emitContext(parent, bind, val, stamp, this, context)
      }
      if (!context) {
        let instances = bind.instances
        if (instances) {
          this.eInstances(instances, bind, val, stamp)
        }
        emit(this, bind, val, stamp)
      }
    } else {
      const instances = bind.instances
      if (instances) {
        this.eInstances(instances, bind, val, stamp)
      }
      emit(this, bind, val, stamp)
    }
  }
}
