'use strict'
const resolve = require('./resolve')
const on = require('./on')
// remove a large part of logics from this file
// only thing that it should do special is getting data as a default
// or getting the keys -- must be able to refactor this down to 10 lines
// keyMap are slow -- have to make those faster
// also support keyMap in emit or remove them alltogether (side effects, unclear etc)

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
  keyMap: true
}

exports.on = {}

exports.keyMap = on.properties.keyMap

exports.define = {
  on (type, val, key, unique, event, nocontext) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.on('data', type, val, key, unique, event)
    }
    const observable = resolve.call(this, type, val, key, event, nocontext)
    observable._emitters[type].on(val, key, unique, event, nocontext)
    return observable
  },
  once (type, val, key, unique, event) {
    if (this.val === null) {
      return this
    } else if (typeof type !== 'string') {
      return this.once('data', type, val, key, unique)
    }
    const mapKey = type in this.keyMap && this.keyMap[type]
    if (mapKey) { type = mapKey }
    let observable = resolve.call(this, type, val, key, event)
    observable._emitters[type].once(val, key, unique, event)
    return observable
  }
}
