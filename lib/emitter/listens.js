'use strict'
var Base = require('vigour-base')
var ListensStore = module.exports = new Base({
  noContext: true,
  noReference: true
}).Constructor

// this still feels a bit slow can become a lot fgaster

ListensStore.Attach = new ListensStore({
  define: {
    removeProperty (property, key) {
      const store = property.attach
      const keys = store._keys
      if (keys) {
        for (let i = 0, len = keys.length; i < len; i++) {
          let storeKey = keys[i]
          if (store[storeKey] && store[storeKey][1] === this._parent) {
            store.removeProperty(store[storeKey], storeKey)
          }
        }
      }
      this[key] = null
    }
  }
}).Constructor

ListensStore.Base = new ListensStore({
  define: {
    removeProperty (property, key) {
      const store = property.base
      const keys = store._keys
      if (keys) {
        for (let i = 0, len = keys.length; i < len; i++) {
          let storeKey = keys[i]
          if (store[storeKey] && store[storeKey] === this._parent) {
            store.removeProperty(store[storeKey], storeKey)
          }
        }
        if (key !== '_parent' && key !== 'key') {
          this[key] = null
        }
      }
    }
  }
}).Constructor
