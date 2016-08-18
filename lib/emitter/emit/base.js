'use strict'
module.exports = function execBase (listeners, emitter, bind, val, stamp) {
  const type = emitter.key
  if (type !== 'data') {
    throw new Error('base on non-data emitter resolve later!')
  }
  const keys = listeners._keys || listeners.keys()
  for (let i = 0, len = keys.length; i < len; i++) {
    let property = listeners[keys[i]]
    if (property._emitters.data) {
      property._emitters.data.emit(property, val, stamp)
    }
  }
}
