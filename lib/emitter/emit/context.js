'use strict'
var emit = require('./emit')

function getContextLevel (target, parent, index) {
  var i = 0
  while (target) {
    if (target._i && target._i[index] === parent) {
      return i
    }
    i++
    target = target._parent
  }
}

module.exports = function emitContext (parent, bind, stamp, data, emitter, context, seed, p) {
  var parentInstances
  while (parent && !parent.noContext) {
    parentInstances = parent._i
    let cLevel
    if (parentInstances) {
      for (let i = 0, len = parentInstances.length; i < len; i++) {
        let instance = parentInstances[i]
        if (
          !context ||
          instance === context
        ) {
          if (seed) {
            if (!cLevel) {
              cLevel = getContextLevel(p, instance, i)
            }
            if (cLevel) {
              p._c = instance
              p._cLevel = cLevel
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, cLevel, instance)
              p._c = null
              p._cLevel = null
            } else {
              bind._c = instance
              bind._cLevel = seed
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, seed, instance)
              bind._c = null
              bind._cLevel = null
            }
          } else {
            if (!cLevel) {
              cLevel = getContextLevel(bind, instance, i)
            }
            if (cLevel) {
              bind._c = instance
              bind._cLevel = cLevel
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, cLevel, instance)
              bind._c = null
              bind._cLevel = null
            }
          }
        }
      }
      parent = null
    } else {
      parent = parent._parent
    }
  }
}

// --- check if this is still nessecary --- (its a nice feature)
// if (parent._isChild) {
// try to remove this
//   if (parent.handleContextChild) {
//     parent._isChild.handleContextChild(data, stamp, context)
//   }
// }
