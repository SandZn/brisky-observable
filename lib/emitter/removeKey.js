'use strict'
exports.removeKeyFromOtherStores = function (key, type, emitter) {
  // clean this up later -- now
  var types = {
    fn: true,
    base: true,
    attach: true
  }

  for (let type$ in types) {
    if (type$ !== type) {
      if (emitter[type$] && emitter[type$][key]) {
        emitter[type$].removeProperty(emitter[type$][key], key)
      }
    }
  }
}
