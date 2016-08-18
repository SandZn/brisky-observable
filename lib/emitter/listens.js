'use strict'
var Base = require('vigour-base')
var ListensStore = module.exports = new Base({
  noContext: true,
  noReference: true
}).Constructor

// this still feels a bit convoluted
ListensStore.ListensOnattach = new ListensStore({
  define: {
    removeProperty (property, key) {
      // no keys ofc....
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

ListensStore.ListensOnBase = new ListensStore({
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

// removing the listnes on (do this later! ignore for now)
// function removeProperty( property, key ) {
//   if( this[key] !== null ) {
//     this[key] = null
//     if( key[0] !== '_' && util.isEmpty(this) && this._parent ) {
//       this._parent.removeProperty( this, this.key, false )
//     }
//   }
// }
