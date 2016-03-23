'use strict'
exports.universal = function emitInstances (instances, _key, key, val, stamp) {
  for (let i = instances.length - 1; i >= 0; i--) {
    let on = instances[i].__on
    let emitter = on[_key] || on[key]
    if (emitter) {
      emitter.emit(instances[i], stamp, val)
    }
  }
}

exports.data = function emitDataInstances (instances, val, stamp) {
  for (let i = instances.length - 1; i >= 0; i--) {
    let on = instances[i].__on
    let emitter = on._data || on.data
    if (emitter) {
      emitter.emit(instances[i], stamp, val)
    }
  }
}
