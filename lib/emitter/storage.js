'use strict'
var Base = require('vigour-base')
var Storage = new Base({
  noContext: true,
  properties: { val: null },
  define: { removeProperty: removeProperty }
}).Constructor

var attach = new Storage({
  define: {
    removeProperty (property, key, blockRemove) {
      removeProperty.call(this, property, key, blockRemove)
    }
  }
})

var baseStorage = new Storage({
  define: {
    removeProperty (property, key, blockRemove) {
      cleanListens(property, 'listensOnBase', this, true)
      return removeProperty.call(this, property, key, blockRemove)
    }
  }
})

exports.child = Storage

exports.properties = {
  attach: attach,
  base: baseStorage
}

function cleanListens (property, field, storage, base) {
  if (property instanceof Base) {
    let emitter = storage._parent
    removeFromListens(property[field], emitter, base)
  }
}

function removeFromListens (listens, emitter, base) {
  if (listens) {
    // other way arround but need to test ofc!
    for (let i in listens) {
      if (i[0] !== '_') {
        if (listens[i] === emitter) {
          delete listens[i]
          if (base && emitter._parent && listens._parent.val === emitter._parent._parent) {
            listens._parent.val = void 0
          }
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
    // this._keys = null
    if (key[0] !== '_' && isEmpty(this) && this._parent && !blockRemove) {
      this._parent.removeProperty(this, this.key, false, true)
    }
  }
}

function isEmpty (val) {
  for (let key in val) {
    if (!val.properties[key] && val[key] !== null) {
      return false
    }
  }
  return true
}
