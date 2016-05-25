'use strict'
var Emitter = require('../emitter')

// when not pasing val should remove all listeners?
// we need an option to remove all listeners
exports.define = {
  off: function (type, val, event, nocontext) {
    // off without arguments should remove the total emitter
    if (typeof type === 'string') {
      var override = this.overrides[type]
      if (override) {
        type = override
      }
      if (!val) {
        val = 'val'
      }
      var emitter = this.emitters && this.emitters[type]
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
    // TODO clean this up -- performance ger rid of the _context part
    if (key) {
      for (key$ in base.emitters) {
        if (base.emitters[key$] instanceof Emitter && key$[0] !== '_') { // && key$[0] !== '_'
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
