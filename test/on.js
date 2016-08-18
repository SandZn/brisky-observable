'use strict'
var Observable = require('../')
var test = require('tape')

test('on - remove listener trough set notation', function (t) {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.equal('a' in obs._emitters.data.fn, true, 'add fn listener a')
  obs.set({ on: { data: { a: null } } })
  t.equal(obs._emitters.data.fn.a, null, 'removed fn listener a')
  t.end()
})

test('on - dont add key twice', function (t) {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.same(obs.emitters.data.fn.keys(), [ 'a' ], 'add fn listener a')
  obs.set({ on: { data: { a: [ () => {} ] } } })
  t.same(obs.emitters.data.attach.keys(), [ 'a' ], 'add attach listener a')
  // remove listener on fn
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

// do a rewrite of the dirty dirty on/off syntax
// its so mess it not even funny

// OVERWRITE TESTS
// RESOLVE TESTS
