'use strict'
function execReferences (listeners, emitter, bind, stamp, val) {
  let type = emitter.key
  let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
  // all way to slow hasOwnProperty is horrible
  let _type = emitter._key
  if (on && !on[_type] || on.hasOwnProperty(_type)) {
    let keys = listeners._keys || listeners.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      let property = listeners[keys[i]]
      if (property._on && property._on[type] && bind === property.val) {
        property._on[type].emit(property, stamp, val)
      }
    }
  }
}

function execAttach (listeners, emitter, bind, stamp, val) {
  let keys = listeners._keys || listeners.keys()
  for (let i = 0, len = keys.length; i < len; i++) {
    let property = listeners[keys[i]]
    if (property[2]) {
      // this is very very slow -- what about reusing the first part for example ?
      // [ val, stamp ]
      property[0].apply(
        bind,
        [ val, stamp ].concat(property[2])
      )
    } else {
      property[0].call(bind, val, stamp, property[1])
    }
  }
}

module.exports = function emit (emitter, bind, stamp, val) {
  var fn = emitter.fn
  var attach = emitter.attach

  if (!bind.__c) {
    let base = emitter.base
    if (base) {
      execReferences(base, emitter, bind, stamp, val)
    }
  }

  if (fn) {
    let keys = fn._keys || fn.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      fn[keys[i]].call(bind, val, stamp)
    }
  }

  if (attach) {
    execAttach(attach, emitter, bind, stamp, val)
  }
}
