'use strict'
var Base = require('vigour-base')
var ListensStore = module.exports = new Base({
  noContext: true,
  noReference: true
}).Constructor

ListensStore.ListensOnattach = new ListensStore({
  define: {
    removeProperty (property, key) {
      if (key[0] !== '_') {
        var store = property.attach
        for (var storeKey in store) {
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
      // this can be greatly increased in speed
      if (key[0] !== '_') {
        var store = property.base
        for (var storeKey in store) {
          if (store[storeKey] && store[storeKey] === this._parent) {
            store.removeProperty(store[storeKey], storeKey)
          }
        }
      }
      if (key !== '_parent' && key !== 'key') {
        this[key] = null
      }
    }
  }
}).Constructor

// removing the listnes on (do this later!)
// function removeProperty( property, key ) {
//   if( this[key] !== null ) {
//     this[key] = null
//     if( key[0] !== '_' && util.isEmpty(this) && this._parent ) {
//       this._parent.removeProperty( this, this.key, false )
//     }
//   }
// }
