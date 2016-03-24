'use strict'
var Base = require('vigour-base')
var Emitter = require('../../emitter')

module.exports = new Base({
  Child: Emitter
}).Constructor
