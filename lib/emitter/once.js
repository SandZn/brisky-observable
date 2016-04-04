'use strict'
exports.define = {
  once (listener, key, unique, stamp) {
    var emitter = this
    var once
    if (typeof listener === 'function') {
      once = function (val, stamp) {
        emitter.clearContext()
        emitter.off(once)
        listener.call(this, val, stamp)
      }
    } else if (listener._base_version) {
      let type = this.key
      once = function (val, stamp) {
        emitter.off(once)
        listener.emit(type, val, stamp)
      }
    } else if (listener instanceof Array) {
      once = listener
      let internal = listener[0]
      listener[0] = function (val, stamp) {
        emitter.off(listener[0])
        internal.call(this, val, stamp, listener[1])
      }
    }
    return this.on(once, key, unique, stamp)
  }
}
