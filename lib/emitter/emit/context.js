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

function setContext (target, instance, bind, stamp, data, emitter, cLevel) {
  let restore
  let restoreLevel
  if (target._c) {
    restore = target._c
    restoreLevel = target._cLevel
  }
  target._c = instance
  target._cLevel = cLevel
  emit(emitter, bind, stamp, data)
  emitContext(instance, bind, stamp, data, emitter, void 0, cLevel, instance)
  target._c = restore || null
  target._cLevel = restoreLevel || null
}

function emitContext (parent, bind, stamp, data, emitter, context, seed, p) {
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
              setContext(p, instance, bind, stamp, data, emitter, cLevel)
            } else {
              setContext(bind, instance, bind, stamp, data, emitter, seed)
            }
          } else {
            if (!cLevel) {
              cLevel = getContextLevel(bind, instance, i)
            }
            if (cLevel) {
              setContext(bind, instance, bind, stamp, data, emitter, cLevel)
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

module.exports = emitContext
// --- check if this is still nessecary --- (its a nice feature)
// if (parent._isChild) {
// try to remove this
//   if (parent.handleContextChild) {
//     parent._isChild.handleContextChild(data, stamp, context)
//   }
// }
