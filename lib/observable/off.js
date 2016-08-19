'use strict'
const Emitter = require('../emitter')
// we need an option to remove all listeners
// off without arguments should remove the total emitter

exports.define = {
  off (type, val, event, nocontext) {
    if (typeof type === 'string') {
      if (!val) { val = 'val' }
      const emitter = this.emitters && this.emitters[type]
      if (emitter) {
        emitter.off(val, void 0, nocontext)
      }
    } else {
      findAndRemove(this, type, void 0, val, nocontext)
    }
  }
}

function findAndRemove (base, val, emitter, key, nocontext) {
  var key$
  if (!emitter) {
    if (key) {
      for (key$ in base.emitters) {
        // isEmitter
        if (base.emitters[key$] instanceof Emitter && key$[0] !== '_') {
          base.emitters[key$].off(key, nocontext)
        }
      }
    } else {
      for (key$ in base.emitters) {
        if (base.emitters[key$] instanceof Emitter) {
          findAndRemove(base, val, base.emitters[key$], key, nocontext)
        }
      }
    }
  } else {
    emitter.off(val, nocontext)
  }
}
