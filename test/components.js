'use strict'
const Observable = require('../')
const test = require('tape')
const Base = require('vigour-base')

test('base and emitter type', function (t) {
  t.plan(2)
  const Emitter = require('../lib/emitter')
  const obs = new Observable({
    base: { type: 'base' },
    emitter: { type: 'emitter' }
  })
  t.equal(obs.base instanceof Base, true)
  t.equal(obs.emitter instanceof Emitter, true)
})

test('observable type', function (t) {
  t.plan(1)
  const Obs = new Observable({
    Child: Base
  }).Constructor
  const instance = new Obs({
    something: { type: 'observable' }
  })
  t.equal(instance.something instanceof Observable, true)
})