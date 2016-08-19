'use strict'
module.exports = function onCreation (type, val, key, event, payload, nocontext) {
  var observable = this
  const on = this.hasOwnProperty('emitters') && this.emitters
  if (!on) {
    console.log('go go go')
    this.setKey('on', {})
    this.emitters.setKey(type, payload, event, nocontext)
  } else if (on.__c && !nocontext) {
    // seems wrong here
    console.log('yo yo yo yo')
    observable = resolveContext(observable, type, on)
  } else if (!on[type]) {
    on.setKey(type, payload, event, nocontext)
  }
  return observable
}

// make test for resolving but later
function resolveContext (observable, type, on, payload) {
  return observable.resolveContext({ on: { [type]: payload } }, false, on.__c)
}
