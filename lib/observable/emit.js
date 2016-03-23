'use strict'
// var vstamp = require('vigour-stamp') -- may want this

exports.define = {
  // add stamps as well
  emit (key, data, stamp, ignore) {
    var on = this._on
    if (on) {
      let emitter = on[key]
      if (emitter) {
        emitter.emit(this, stamp, data)
      } else {
        emitNonSharedInstances(this, key, data, stamp)
      }
    }
  }
}

function emitNonSharedInstances (bind, key, data, stamp) {
  let instances = bind.getInstances()
  if (instances) {
    let emitter
    for (let i = instances.length - 1; i >= 0; i--) {
      emitter = instances[i].__on[key] // use on to share
      if (emitter) {
        emitter.emitInternal(data, stamp, instances[i])
      }
    }
  }
}
