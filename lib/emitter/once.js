'use strict'
const vstamp = require('vigour-stamp')
exports.define = {
  once (listener, key, unique, stamp) {
    var once

    // lets remove that done shit
    const emitter = this
    if (typeof listener === 'function') {
      once = (val, stamp) => {
        emitter.clearContext()
        vstamp.done(stamp, () => emitter.off(once))
        listener.call(this, val, stamp)
      }
    } else if (listener.isBase) {
      const type = this.key
      once = (val, stamp) => {
        vstamp.done(stamp, () => emitter.off(once))
        listener.emit(type, val, stamp)
      }
    } else if (listener instanceof Array) {
      once = listener
      const internal = listener[0]
      listener[0] = function (val, stamp) {
        vstamp.done(stamp, () => emitter.off(once))
        internal.call(this, val, stamp, listener[1])
      }
    }
    return this.on(once, key, unique, stamp)
  }
}
