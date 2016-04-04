'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')
var emitInstance = require('../../emitter/emit/instances').instance

module.exports = new Base({
  Child: Emitter,
  properties: {
    data: new Emitter({
      define: {
        // specific fields get optmized by v8 arround 30 times faster then a method that uses obj["key"]
        eInstances (instances, bind, stamp, val) {
          var len = instances.length
          for (let i = 0; i < len; i++) {
            let instance = instances[i]
            let on = instance.__on
            let iEmitter = on && on._data // dirty -- not creating nested context things is rly messed up
            if (iEmitter) {
              emitInstance(this, iEmitter, instance, stamp, val)
            }
          }
        }
      }
    }),
    remove: {
      val: new Emitter(),
      override: 'removeEmitter'
    }
  }
}).Constructor
