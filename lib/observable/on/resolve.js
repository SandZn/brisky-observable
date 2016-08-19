'use strict'
module.exports = function onCreation (type, val, key, stamp, payload, nocontext) {
  var observable = this
  const on = observable.hasOwnProperty('emitters') && observable.emitters
  if (!on) {
    observable = observable.set({ emitters: {} }) || observable
    observable.emitters.setKey(type, payload, stamp, nocontext)
  } else if (!on[type]) {
    on.setKey(type, payload, stamp, nocontext)
  }
  return observable
}
