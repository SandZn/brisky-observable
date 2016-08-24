'use strict'
const Base = require('vigour-base')
const Emitter = require('../../emitter')
const emitInstance = require('../../emitter/emit/instances').instance

module.exports = new Base({
  child: Emitter,
  properties: {
    data: new Emitter({
      define: {
        eInstances (instances, bind, stamp, val) {
          const len = instances.length
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
              const len = instances.length
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
