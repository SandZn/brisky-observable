'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')

module.exports = new Base({
  Child: Emitter,
  properties: {
    property: require('../../emitter/property'),
    reference: require('../../emitter/reference'),
    error: require('../../emitter/error'),
    remove: {
      val: new Emitter(),
      override: 'removeEmitter'
    },
    parent: {
      val: new Emitter({
        emitInstances: false,
        emitContexts: false
      }),
      override: 'parentEmitter'
    },
    new: new Emitter({
      emitInstances: false,
      emitContexts: false
    }),
    data: require('../../emitter/data')
  }
}).Constructor
