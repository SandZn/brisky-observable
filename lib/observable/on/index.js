'use strict'
var resolve = require('./resolve')
var on = require('./on')
// remove a large part of logics from this file
// only thing that it should do special is getting data as a default
// or getting the keys -- must be able to refactor this down to 10 lines
// overrides are slow -- have to make those faster
// also support overrides in emit or remove them alltogether (side effects, unclear etc)

exports.properties = {
  define: {
    on: {
      val: on,
      key: 'emitters'
    }
  },
  // add to base!
  listensOnBase: true, // these things have to become optmized (dont use array use uids)
  listensOnAttach: true, // these things have to become optmized (dont use array use uids)
  overrides: true
}

exports.on = {}

exports.overrides = on.properties.keyMap

exports.define = {
  on (type, val, key, unique, event, nocontext) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.on('data', type, val, key, unique, event)
    }
    let observable = resolve.call(this, type, val, key, event, nocontext)
    observable._emitters[type].on(val, key, unique, event, nocontext)
    return observable
  },
  once (type, val, key, unique, event) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.once('data', type, val, key, unique)
    }
    let override = this.overrides[type]
    if (override) {
      type = override
    }
    let observable = resolve.call(this, type, val, key, event)
    observable._emitters[type].once(val, key, unique, event)
    return observable
  }
}
