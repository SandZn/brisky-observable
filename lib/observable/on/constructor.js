'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')

module.exports = new Base({
  Child: Emitter,
  properties: {
    // remove: {
    //   val: new Emitter(),
    //   override: 'removeEmitter'
    // },
    // new: new Emitter({
    //   emitInstances: false,
    //   emitContexts: false
    // }),
    // data: require('../../emitter/data')
  }
}).Constructor
