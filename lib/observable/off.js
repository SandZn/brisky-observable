'use strict'
exports.define = {
  off (type, val, event, nocontext) {
    if (typeof type === 'string') {
      if (!val) { val = 'val' }
      const emitter = this.emitters && this.emitters[type]
      if (emitter) {
        emitter.off(val, void 0, nocontext)
      }
    } else {
      findAndRemove(this, type, val, nocontext)
    }
  }
}

function findAndRemove (target, val, key, nocontext) {
  const emitters = target.emitters
  if (emitters) {
    if (key) {
      const keys = emitters.keys()
      for (let i = 0, len = keys.length; i < len; i++) {
        emitters[keys[i]].off(key, nocontext)
      }
    } else {
      if (!val) {
        emitters.remove()
      } else {
        const keys = emitters.keys()
        for (let i = 0, len = keys.length; i < len; i++) {
          emitters[keys[i]].off(val, void 0, nocontext)
        }
      }
    }
  }
}
