'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')
var emitInstance = require('../../emitter/emit/instances').instance

module.exports = new Base({
  Child: Emitter,
  properties: {
    data: new Emitter({
      define: {
        // specific fields get optmized by v8 arround 30 times faster then method that uses "_key"
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
    })
  }
}).Constructor
