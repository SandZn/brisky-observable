'use strict'
var emitContext = require('./context')
var emit = require('./emit')

module.exports = function emitInstances (instances, emitter, bind, event, data) {
  let instance
  let length = instances.length
  for (let i = 0; i < length; i++) {
    instance = instances[i]
    if (instance.__on && instance.__on[emitter.key] !== emitter) {
      emitter = instance.__on[emitter.key]
      emit(emitter, instance, event, data)
      if (instance._instances) {
        emitInstances(instance._instances, instance.__on[emitter.key], instance, event, data)
      }
      emitContext(instance.parent, instance, event, data, emitter)
    } else {
      if (instance._instances) {
        emitInstances(instance._instances, emitter, instance, event, data)
      }
      emit(emitter, instance, event, data)
      emitContext(instance.parent, instance, event, data, emitter)
    }
  }
}
