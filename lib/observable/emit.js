'use strict'
var Event = require('vigour-event')
exports.inject = require('./instances')

exports.define = {
  emit (key, data, event, ignore) {
    // if (event === false) {
    //   return
    // }
    // let trigger
    // if (event === void 0) {
    //   if (ignore) {
    //     return
    //   }
    //   event = new Event() // key
    //   trigger = true
    // }
    // if (!ignore) {
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

        // let override = on._properties._overrides[key]
        // if (override) {
        //   key = override
        // }
        // let emitter = on[key]
        // if (emitter) {
        //   event.push(emitter, this, data)
        // }
          // emitter.emitInternal(data, event, this)
        // } else {
        //   emitNonSharedInstances(this, key, data, event)
        // }
      }
    // }
    // if (trigger) {
    //   event.trigger()
    // }
  }
}

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
