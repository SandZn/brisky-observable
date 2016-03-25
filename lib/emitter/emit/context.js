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
          let restore
          let restoreLevel
          if (seed) {
            if (!cLevel) {
              cLevel = getContextLevel(p, instance, i)
            }
            if (cLevel) {
              if (p._c) {
                restore = p._c
                restoreLevel = p._cLevel
              }
              p._c = instance
              p._cLevel = cLevel
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, cLevel, instance)
              p._c = restore || null
              p._cLevel = restoreLevel || null
            } else {
              if (bind._c) {
                restore = bind._c
                restoreLevel = bind._cLevel
              }
              bind._c = instance
              bind._cLevel = seed
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, seed, instance)
              bind._c = restore || null
              bind._cLevel = restoreLevel || null
            }
          } else {
            if (!cLevel) {
              cLevel = getContextLevel(bind, instance, i)
            }
            if (cLevel) {
              if (bind._c) {
                restore = bind._c
                restoreLevel = bind._cLevel
              }
              bind._c = instance
              bind._cLevel = cLevel
              emit(emitter, bind, stamp, data)
              emitContext(instance, bind, stamp, data, emitter, void 0, cLevel, instance)
              bind._c = restore || null
              bind._cLevel = restoreLevel || null
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
