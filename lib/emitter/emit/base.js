'use strict'
module.exports = function execBase (listeners, emitter, bind, val, stamp) {
  let type = emitter.key
  let on = (!bind._emitters && bind.emitters) || bind.hasOwnProperty('_emitters') && bind._emitters
  // @todo: FIX -- all WAY to slow hasOwnProperty is horrible
  let _type = emitter._key
  if (on && !on[_type] || on.hasOwnProperty(_type)) {
    let keys = listeners._keys || listeners.keys()
    for (let i = 0, len = keys.length; i < len; i++) {
      let property = listeners[keys[i]]
      if (property.emitters && property.emitters[type] && bind === property.val) {
        property.emitters[type].emit(property, val, stamp)
      }
    }
  }
}
