'use strict'

module.exports = function emitContext (parent, bind, event, data, emitter, context, prevpath) {
  let parentInstances
  let path
  while (parent && parent.getInstances && !parent.noContext) {
    parentInstances = parent.getInstances()
    if (parent.hasOwnProperty('_isChild')) {
      if (parent.handleContextChild) {
        parent._isChild.handleContextChild(data, event, context)
      }
    }
    if (parentInstances) {
      let pathlength
      for (let i = 0, length = parentInstances.length; i < length; i++) {
        let instance = parentInstances[i]
        let target = instance
        if (
          !context ||
          instance === context
        ) {
          if (path) {
            if (!pathlength) {
              pathlength = path.length - 1
            }
            for (let j = pathlength; j >= 0; j--) {
              target = target[path[j]]
              if (!target) {
                break
              }
            }
          }
          if (target && target[bind.key] === bind) {
            if (!emitter) {
              throw new Error('no emitter! emit context' + bind._path.join('.'))
            }
            emitContext(instance, bind, event, data, emitter, false, path)
            emitter.execInternal(bind, event, data)
          }
          if (context) {
            return
          }
        }
      }
      // ********* NEEDS PERF OPTIMIZATION ************
      // really heavy think of a solution later for now lets celebrate that it works!
      // becomes espacialy problematic with many parents
      return
    }
    if (!path) {
      path = prevpath ? prevpath.concat() : []
    }
    path.push(parent.key) // reuse!!! godamn must be easy
    parent = parent._parent
  }
}
