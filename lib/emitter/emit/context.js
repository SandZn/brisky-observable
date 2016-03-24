'use strict'
var emit = require('./emit')
// if (parent._isChild) {
// try to remove this
//   if (parent.handleContextChild) {
//     parent._isChild.handleContextChild(data, stamp, context)
//   }
// }

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

module.exports = function emitContext (parent, bind, stamp, data, emitter, context, seed) {
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
          if (!cLevel) {
            cLevel = getContextLevel(bind, instance, i)
            if (seed) { cLevel + seed }
          }
          if (cLevel) {
            bind._c = instance
            bind._cLevel = cLevel
            emitContext(instance, bind, stamp, data, emitter, cLevel)
            emit(emitter, bind, stamp, data)
          }
        }
        parent = null
      }
    } else {
      parent = parent._parent
    }
  }
}
