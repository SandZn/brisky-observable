'use strict'
module.exports = function onCreation (type, val, key, event, payload, nocontext) {
  var observable = this
  var on = this.hasOwnProperty('emitters') && this.emitters
  if (!on) {
    this.setKey('on', {})
    this.emitters.setKey(type, payload, event, nocontext)
  } else if (on.__c && !nocontext) {
    observable = resolveContext(observable, type, on)
  } else if (!on[type]) {
    on.setKey(type, payload, event, nocontext)
  }
  return observable
}

function resolveContext (observable, type, on, payload) {
  return observable.resolveContext({on: { [type]: payload }}, false, on.__c)
}
