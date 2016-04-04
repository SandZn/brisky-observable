'use strict'
// var execattach = require('./attach')

function execReferences (base, emitter, bind, stamp, val) {
  let type = emitter.key
  let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
  // all way to slow hasOwnProperty is horrible
  let _type = emitter._key
  if (on && !on[_type] || on.hasOwnProperty(_type)) {
    emitter.base.each(function (property) {
      if (property._on && property._on[type] && bind === property.val) {
        // property.clearContextUp() // this is very bad -- try to avoid if possible
        property._on[type].emit(property, stamp, val)
      }
    })
  }
}

module.exports = function emit (emitter, bind, stamp, val) {
  // now lets add base and attach
  var fn = emitter.fn

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
}

/*
  var emitter = this
    var stamp = event.stamp
    if (!bind._context && emitter.base) {
      // *** CLEAN UP MAYBE GET SPEED BY JUST DOING THIS IN FUNCTION MAKE NICER ANYWAYS ***
      // maybe remove the behaviour to block context / instances updates
      let type = emitter.key
      let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
      let _type = '_' + type // this is fucked slow
      if (on && !on[_type] || on.hasOwnProperty(_type)) {
        emitter.base.each(function (property) {
          // *** CANDITATE FOR REMOVAL! ***
          if (bind === property.__input) {
            property.clearContextUp()
            triggerBind(property._on[type], property, event, data)
          }
        }, function (property, key, base, stamp) {
          return !base._properties[key] &&
            property._on &&
            property._on[type]
        }, stamp)
      }
    }
    // *** CANDITATE FOR REMOVAL! ***
    var original = bind
    bind = bind.getBind()
    if (bind) {
      if (emitter.fn) {
        emitter.fn.each(function (property, key) {
          property.call(bind, data, event, original)
        }, emitter.isExecutable, stamp)
      }
      if (emitter.attach) {
        emitter.attach.each(function (property) {
          execattach(property, bind, event, emitter, data)
        }, emitter.isExecutable, stamp)
      }
    }
*/
