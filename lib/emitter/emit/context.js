'use strict'
// if (parent._isChild) {
// try to remove this
//   if (parent.handleContextChild) {
//     parent._isChild.handleContextChild(data, stamp, context)
//   }
// }

module.exports = function emitContext (parent, bind, stamp, data, emitter, context, prevpath) {
  var parentInstances, path
  while (parent && !parent.noContext) {
    parentInstances = parent._i
    if (parentInstances) {
      let pathlength
      for (let i = 0, length = parentInstances.length; i < length; i++) {
        let instance = parentInstances[i]
        let target = instance
        if (
          !context ||
          instance === context
        ) {
          // need this path -- but dont want to make it if its totally unnsecarry
          // also the non-context case i pretty important (only thing important in the client)
          // what to do about it?
          // what about by default emitters dont do contex? have to say context: true
          // this way subscription and state will help with this but nothing else
          // why do i need this? -- for states -- state allready walk up the parent chain
          // let state create subscriptions on level where this is nessecary
          // create path from the bind
          console.log('hahaha', bind.realPath())
          // apply context all voer the place -- may be a better way to do this
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
              throw new Error('no emitter! emit context' + bind._path.join('/'))
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
    parent = parent._parent
  }
}
