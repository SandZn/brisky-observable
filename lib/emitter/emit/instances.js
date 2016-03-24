'use strict'
var emitContext = require('./context')
var emit = require('./emit')

function factory (key) {
  return function emitInstancesUniversal (instances, bind, event, data) {
    var len = instances.length
    for (let i = 0; i < len; i++) {
      let instance = instances[i]
      let on = instance.__on
      if (on && on[key] !== this) {
        emit(on[key], instance, event, data)
        if (instance._i) {
          emitInstancesUniversal.call(this, instance._i, on[key], instance, event, data)
        }
        emitContext(instance.parent, instance, event, data, this)
      } else {
        if (instance._i) {
          emitInstancesUniversal.call(this, instance._i, this, instance, event, data)
        }
        emit(this, instance, event, data)
        emitContext(instance.parent, instance, event, data, this)
      }
    }
  }
}

exports.data = function emitInstancesData (instances, bind, event, data) {
  var len = instances.length
  for (let i = 0; i < len; i++) {
    let instance = instances[i]
    let on = instance.__on
    if (on && on._data !== this) {
      emit(on._data, instance, event, data)
      if (instance._i) {
        emitInstancesData.call(this, instance._i, on._data, instance, event, data)
      }
      emitContext(instance.parent, instance, event, data, this)
    } else {
      if (instance._i) {
        emitInstancesData.call(this, instance._i, this, instance, event, data)
      }
      emit(this, instance, event, data)
      emitContext(instance.parent, instance, event, data, this)
    }
  }
}

exports.get = function (key) {
  if (!exports[key]) {
    exports[key] = factory('_' + key)
  }
  return exports[key]
}
