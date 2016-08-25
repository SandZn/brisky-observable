'use strict'
const on = require('./on')

exports.properties = {
  define: {
    on: {
      val: on,
      key: 'emitters'
    }
  },
  //  fix these listensOn crackpots
  listensOnBase: true, // these things have to become optmized (dont use array use uids)
  listensOnAttach: true // these things have to become optmized (dont use array use uids)
}

exports.on = {}

exports.define = {
  on (type, val, key, unique, event, nocontext) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.on('data', type, val, key, unique, event)
    } else {
      const observable = emitter(this, type)
      const emitters = observable._emitters
      if (type !== 'data') {
        type = emitters.properties.keyMap[type] || type
      }
      emitters[type].on(val, key, unique, event, nocontext)
      return observable
    }
  },
  once (type, val, key, unique, event) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.once('data', type, val, key, unique)
    } else {
      const observable = emitter(this, type)
      const emitters = observable._emitters
      if (type !== 'data') {
        type = emitters.properties.keyMap[type] || type
      }
      emitters[type].once(val, key, unique, event)
      return observable
    }
  }
}

function emitter (target, type) {
  return target.set({ emitters: { [type]: {} } }, false) || target
}
