'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')
var emitInstance = require('../../emitter/emit/instances').instance

module.exports = new Base({
  Child: Emitter,
  properties: {
    data: new Emitter({
      define: {
        // add this for removeEmitter as well
        // specific fields get optmized by v8 arround 30 times faster then a method that uses obj["key"]
        eInstances (instances, bind, stamp, val) {
          var len = instances.length
          for (let i = 0; i < len; i++) {
            let instance = instances[i]
            let on = instance.__on
            let iEmitter = on && on._data
            if (iEmitter) {
              emitInstance(this, iEmitter, instance, stamp, val)
            }
          }
        }
      }
    }),
    remove: {
      val: new Emitter({
        define: {
          eInstances (instances, bind, stamp, val) {
            var len = instances.length
            for (let i = 0; i < len; i++) {
              let instance = instances[i]
              let on = instance.__on
              let iEmitter = on && on._removeEmitter
              if (iEmitter) {
                emitInstance(this, iEmitter, instance, stamp, val)
              }
            }
          }
        }
      }),
      override: 'removeEmitter'
    }
  }
}).Constructor
