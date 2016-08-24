'use strict'
const Base = require('vigour-base')
const Storage = new Base({
  noContext: true,
  properties: { val: null },
  define: { removeProperty }
}).Constructor

const attach = new Storage({
  define: {
    removeProperty (property, key, blockRemove) {
      removeProperty.call(this, property, key, blockRemove)
    }
  }
})

const base = new Storage({
  define: {
    removeProperty (property, key, blockRemove) {
      cleanListens(property, 'listensOnBase', this, true)
      return removeProperty.call(this, property, key, blockRemove)
    }
  }
})

exports.child = Storage

exports.properties = { attach, base }

function cleanListens (property, field, storage, base) {
  if (property instanceof Base) {
    let emitter = storage._parent
    removeFromListens(property[field], emitter, base)
  }
}

function removeFromListens (listens, emitter, base) {
  if (listens) {
    const keys = listens._keys
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (listens[key] === emitter) {
        listens.removeKey(key, listens[key])
        delete listens[key]
        if (base && emitter._parent && listens._parent.val === emitter._parent._parent) {
          listens._parent.val = void 0
        }
      }
    }
  }
}

function removeProperty (property, key, blockRemove) {
  const target = this[key]
  if (target !== null) {
    this.removeKey(key, target)
    this[key] = null
  }
}
