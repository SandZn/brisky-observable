'use strict'
module.exports = function execBase (listeners, emitter, bind, val, stamp) {
  const type = emitter.key
  if (type !== 'data') {
    execBaseType(type, listeners, emitter, bind, val, stamp)
  } else {
    const keys = listeners._keys || listeners.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      let property = listeners[keys[i]]
      if (property._emitters.data) {
        property._emitters.data.emit(property, val, stamp)
      }
    }
  }
}

function execBaseType (type, listeners, emitter, bind, val, stamp) {
  const keys = listeners._keys || listeners.keys()
  for (let i = 0, len = keys.length; i < len; i++) {
    let property = listeners[keys[i]]
    if (property._emitters[type]) {
      property._emitters[type].emit(property, val, stamp)
    }
  }
}
