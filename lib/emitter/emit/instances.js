'use strict'
var emitContext = require('./context')
var emit = require('./emit')

function universal (instances, bind, stamp, val) {
  var len = instances.length
  var key = this._k
  for (let i = 0; i < len; i++) {
    let instance = instances[i]
    let on = instance.__on
    let iEmitter = on && on[key]
    if (iEmitter) {
      emitInstance(this, iEmitter, instance, stamp, val)
    }
  }
}

function emitInstance (emitter, iEmitter, instance, stamp, val, emitInstances) {
  let parent = instance._parent
  let instances = instance._i
  if (iEmitter !== emitter) {
    emit(iEmitter, instance, stamp, val)
    if (instances) {
      iEmitter.eInstances(instances, instance, stamp, val)
    }
    if (parent) {
      emitContext(parent, instance, stamp, val, iEmitter)
    }
  } else {
    if (instances) {
      emitter.eInstances(instances, instance, stamp, val)
    }
    emit(emitter, instance, stamp, val)
    if (parent) {
      emitContext(parent, instance, stamp, val, emitter)
    }
  }
}

exports.instance = emitInstance
exports.universal = universal
