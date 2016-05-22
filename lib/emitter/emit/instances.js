'use strict'
var emitContext = require('./context')
var emit = require('./emit')

function universal (instances, bind, val, stamp) {
  var len = instances.length
  var key = this._k
  for (let i = 0; i < len; i++) {
    let instance = instances[i]
    let on = instance.__on
    let iEmitter = on && on[key] // slow but nessecry
    if (iEmitter) {
      emitInstance(this, iEmitter, instance, val, stamp)
    }
  }
}

function emitInstance (emitter, iEmitter, instance, val, stamp, emitInstances) {
  let parent = instance._parent
  let instances = instance._i
  if (iEmitter !== emitter) {
    emit(iEmitter, instance, val, stamp)
    if (instances) {
      iEmitter.eInstances(instances, instance, val, stamp)
    }
    if (parent) {
      emitContext(parent, instance, val, stamp, iEmitter)
    }
  } else {
    if (instances) {
      emitter.eInstances(instances, instance, val, stamp)
    }
    emit(emitter, instance, stamp, val)
    if (parent) {
      emitContext(parent, instance, val, stamp, emitter)
    }
  }
}

exports.instance = emitInstance
exports.universal = universal
