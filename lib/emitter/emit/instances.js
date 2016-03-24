'use strict'
var emitContext = require('./context')
var emit = require('./emit')

module.exports = function emitInstances (instances, emitter, bind, event, data) {
  var _key = '_' + emitter.key
  var len = instances.length
  for (let i = 0; i < len; i++) {
    let instance = instances[i]
    let on = instance.__on
    // double check if thi sis also good
    if (on && on[_key] !== emitter) {
      emit(on[_key], instance, event, data)
      if (instance._i) {
        emitInstances(instance._i, on[_key], instance, event, data)
      }
      emitContext(instance.parent, instance, event, data, emitter)
    } else {
      if (instance._i) {
        emitInstances(instance._i, emitter, instance, event, data)
      }
      emit(emitter, instance, event, data)
      emitContext(instance.parent, instance, event, data, emitter)
    }
  }
}
