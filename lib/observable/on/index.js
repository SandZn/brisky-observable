'use strict'
const on = require('./on')

exports.properties = {
  define: {
    on: {
      val: on,
      key: 'emitters'
    }
  },
  //  fix these listens on crappers
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
    }
    const observable = this.set({ emitters: { [type]: {} } }, false) || this
    observable._emitters[type].on(val, key, unique, event, nocontext)
    return observable
  },
  once (type, val, key, unique, event) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.once('data', type, val, key, unique)
    }
    // why not just set and do the id here?
    const observable = this.set({ emitters: { [type]: {} } }, false) || this
    observable._emitters[type].once(val, key, unique, event)
    return observable
  }
}
