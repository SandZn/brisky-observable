'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')
var emitInstance = require('../../emitter/emit/instances').instance

module.exports = new Base({
  child: Emitter,
  keyType: true,
  properties: {
    data: new Emitter({
      // specific fields get optmized by v8 arround 30 times faster then a method that uses obj["key"]
      define: {
        eInstances (instances, bind, stamp, val) {
          var len = instances.length
          for (let i = 0; i < len; i++) {
            let instance = instances[i]
            let on = instance._emitters
            let iEmitter = on && on._data
            if (iEmitter) {
              emitInstance(this, iEmitter, instance, val, stamp)
            }
          }
        }
      }
    }),
    define: {
      remove: {
        val: new Emitter({
          define: {
            eInstances (instances, bind, stamp, val) {
              var len = instances.length
              for (let i = 0; i < len; i++) {
                let instance = instances[i]
                let on = instance._emitters
                let iEmitter = on && on._removeEmitter
                if (iEmitter) {
                  emitInstance(this, iEmitter, instance, val, stamp)
                }
              }
            }
          }
        }),
        key: 'removeEmitter'
      }
    }
  }
})
