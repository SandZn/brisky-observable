'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')

module.exports = new Base({
  Child: Emitter,
  properties: {
    data: new Emitter({
      define: {
        eInstances: require('../../emitter/emit/instances').data
      }
    })
  }
}).Constructor
