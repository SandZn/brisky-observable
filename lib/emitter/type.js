'use strict'
// this has to go fast -- keys will no longer be shared
module.exports = function findType (key, emitter) {
  var storageKey
  if (emitter.fn && emitter.fn[key]) {
    storageKey = 'fn'
  } else if (emitter.base && emitter.base[key]) {
    storageKey = 'base'
  } else if (emitter.attach && emitter.attach[key]) {
    storageKey = 'attach'
  }
  return storageKey
}
