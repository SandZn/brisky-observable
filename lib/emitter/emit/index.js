'use strict'
var emitInstances = require('./instances')
var emitContext = require('./context')
var emit = require('./emit')

exports.define = {
  emit (bind, stamp, data) {
    let parent = bind._parent
    if (parent) {
      let context = bind._context
      if (!bind.noContext) {
        emitContext(parent, bind, stamp, data, this, context)
        bind.clearContextUp(bind._contextLevel)
      }

      if (!context) {
        let instances = this._i
        emitInstances(instances, this, bind, stamp, data)
        emit(this, bind, stamp, data)
      }
    } else {
      let instances = this._i
      if (instances) {
        emitInstances(instances, this, bind, stamp, data)
      }
      emit(this, bind, stamp, data)
    }
  }
}
