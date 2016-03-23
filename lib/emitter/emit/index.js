'use strict'
var emitInstances = require('./instances')
var emitContext = require('./context')
var emit = require('./emit')

// exports.define = {
//   emit (bind, stamp, data) {
//     emit(this, bind, stamp, data)
//   }
// }

exports.define = {
  emit (bind, stamp, data) {
    let parent = bind._parent
    if (parent) {
      let context = bind._c
      if (!bind.noContext) {
        emitContext(parent, bind, stamp, data, this, context)
        bind.clearContextUp(bind._cLevel)
      }
      if (!context) {
        let instances = bind._i
        emitInstances(instances, this, bind, stamp, data)
        emit(this, bind, stamp, data)
      }
    } else {
      let instances = bind._i
      if (instances) {
        emitInstances(instances, this, bind, stamp, data)
      }
      emit(this, bind, stamp, data)
    }
  }
}
