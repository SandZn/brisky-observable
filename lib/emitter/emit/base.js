'use strict'
module.exports = function execBase (listeners, emitter, bind, stamp, val) {
  let type = emitter.key
  let on = (!bind.__on && bind._on) || bind.hasOwnProperty('__on') && bind.__on
  // @todo: FIX -- all WAY to slow hasOwnProperty is horrible
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
