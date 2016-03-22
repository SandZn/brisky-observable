'use strict'
var Event = require('vigour-event')
exports.inject = require('./instances')

exports.define = {
  // default key is data
  emit (key, data, event, ignore) {
    var on = this._on
    if (on) {
      let emitter = on[key]
      if (emitter) {
        let fn = emitter.fn
        if (fn) {
          // may be better idea to just use normal arrays?
          // o inheritance :/
          let keys = fn._keys || fn.keys()
          for (let i = 0, len = keys.length; i < len; i++) {
            fn[keys[i]].call(this, data, event)
          }
        }
      }
      // need override feature ofcourse
    }
  }
}

// need ot use this as well
function emitNonSharedInstances (bind, key, data, event) {
  let instances = bind.getInstances()
  if (instances) {
    let emitter
    for (let i = instances.length - 1; i >= 0; i--) {
      emitter = instances[i].__on[key] // use on to share
      if (emitter) {
        emitter.emitInternal(data, event, instances[i])
      }
    }
  }
}

/*
'use strict'
can also be added there
var isOverwritten = require('./overwrite')
*/
