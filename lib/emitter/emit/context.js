'use strict'

module.exports = function emitContext (parent, bind, stamp, data, emitter, context, prevpath) {
  var parentInstances, path
  while (parent && !parent.noContext) {
    parentInstances = parent._instances
    // does the child not need any instances -- prob not
    if (parent.hasOwnProperty('_isChild')) {
      if (parent.handleContextChild) {
        parent._isChild.handleContextChild(data, stamp, context)
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
            emitContext(instance, bind, stamp, data, emitter, false, path)
            emitter.execInternal(bind, stamp, data)
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
