'use strict'
var execattach = require('./attach')
var triggerBind = require('./bind')

exports.define = {
  // isExecutable (property, key, base, stamp) {
  //   return !base._properties[key]
  // },
  execInternal (bind, event, data) {
    // var emitter = this
    // var stamp = event.stamp
    // if (!bind._context && emitter.base) {
    //   let type = emitter.key
    //   let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
    //   let _type = '_' + type // this is fucked slow
    //   if (on && !on[_type] || on.hasOwnProperty(_type)) {
    //     emitter.base.each(function (property) {
    //       if (bind === property.val) {
    //         property.clearContextUp()
    //         triggerBind(property._on[type], property, event, data)
    //       }
    //     }, function (property, key, base, stamp) {
    //       return !base._properties[key] &&
    //         property._on &&
    //         property._on[type]
    //     }, stamp)
    //   }
    // }

    // var original = bind
    // bind = bind.getBind()
    if (bind) {
      let fn = this.fn
      if (fn) {
        let keys = fn.keys()
        for (let i = 0, len = keys.length; i < len; i++) {
          fn[keys[i]].call(bind, data, event)
        }
      }
      // if (emitter.attach) {
      //   emitter.attach.each(function (property) {
      //     execattach(property, bind, event, emitter, data)
      //   }, emitter.isExecutable, stamp)
      // }
    }
  },
  trigger (bind, event) {
    triggerBind(this, bind, event)
  }
  // trigger (binds, event) {
  //   if (binds) {
  //     if (!this.condition) {
  //       // need to fix these uids!
  //       for (let uid in binds) {
  //         if (uid !== 'val') {
  //           let bind = binds[uid]
  //           triggerBind(this, bind, event)
  //         }
  //       }
  //     } else {
  //       this.condition.trigger(binds, event)
  //     }
  //   }
  // }
}
