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
  emit (bind, stamp, val) {
    let parent = bind._parent
    if (parent) {
      let context = bind.__c
      if (!bind.noContext) {
        emitContext(parent, bind, stamp, val, this, context)
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
        console.log('yo yo yo?', this, bind, instances)
        this.eInstances(instances, bind, stamp, val)
      }
      emit(this, bind, stamp, val)
    }
  }
}
