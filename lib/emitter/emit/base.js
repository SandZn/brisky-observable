'use strict'
module.exports = function execBase (listeners, emitter, bind, val, stamp) {
  const type = emitter.key
  const on = (!bind._emitters && bind.emitters) || bind.hasOwnProperty('_emitters') && bind._emitters
  // @todo: FIX -- all WAY too slow hasOwnProperty is horrible
  // check if check for parent === bind is faster
  const _type = emitter._key
  if (on && !on[_type] || on.hasOwnProperty(_type)) {
    let keys = listeners._keys
    // listeners are not bae instances (thats a good thing)
    // so overwrite add and remove key for listener stores
    for (let i = 0, len = keys.length; i < len; i++) {
      let property = listeners[keys[i]]
      if (property.emitters && property.emitters[type] && bind === property.val) {
        property.emitters[type].emit(property, val, stamp)
      }
    }
  }
}
