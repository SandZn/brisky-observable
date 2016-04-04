'use strict'
module.exports = function execAttach (listeners, emitter, bind, stamp, val) {
  let keys = listeners._keys || listeners.keys()
  for (let i = 0, len = keys.length; i < len; i++) {
    let property = listeners[keys[i]]
    property[0].call(bind, val, stamp, property[1])
  }
}
