'use strict'
// rename to instances
exports.universal = function emitInstances (instances, _key, key, stamp, val) {
  for (let i = 0, len = instances.length; i < len; i++) {
    let on = instances[i]._emitters
    let emitter = on[_key] || on[key]
    if (emitter) {
      emitter.emit(instances[i], val, stamp)
    }
  }
}

exports.data = function emitDataInstances (instances, stamp, val) {
  for (let i = 0, len = instances.length; i < len; i++) {
    let on = instances[i]._emitters
    let emitter = on._data || on.data
    if (emitter) {
      emitter.emit(instances[i], val, stamp)
    }
  }
}
