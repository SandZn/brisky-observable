'use strict'
var Observable = require('../')
var test = require('tape')
var Base = require('vigour-base')

test('base and emitter type', function (t) {
  t.plan(2)
  var Emitter = require('../lib/emitter')
  var obs = new Observable({
    base: { type: 'base' },
    emitter: { type: 'emitter' }
  })
  t.equal(obs.base instanceof Base, true)
  t.equal(obs.emitter instanceof Emitter, true)
})

test('observable type', function (t) {
  t.plan(1)
  var Obs = new Observable({
    Child: Base
  }).Constructor
  var instance = new Obs({
    something: { type: 'observable' }
  })
  t.equal(instance.something instanceof Observable, true)
})