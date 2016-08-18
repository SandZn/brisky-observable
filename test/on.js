'use strict'
var Observable = require('../')
var test = require('tape')

test('on - remove listener trough set notation', (t) => {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.equal('a' in obs._emitters.data.fn, true, 'add fn listener a')
  obs.set({ on: { data: { a: null } } })
  t.equal(obs._emitters.data.fn.a, null, 'removed fn listener a')
  t.end()
})

test('on - overwrite existing key on different type', (t) => {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.same(obs.emitters.data.fn.keys(), [ 'a' ], 'add fn listener a')
  obs.set({ on: { data: { a: [ () => {} ] } } })
  t.same(obs.emitters.data.attach.keys(), [ 'a' ], 'add attach listener a')
  // make this efficient!
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

test('on - add listener to a removed target', (t) => {
  const obs = new Observable()
  obs.remove()
  obs.set({ data: { g () {} } })
  t.equal('data' in obs.emitters, false, 'did not add listener on removed observable')
  t.end()
})

test('on - removed target', (t) => {
  const obs = new Observable()
  obs.remove()
  obs.set({ data: { g () {} } })
  t.equal('data' in obs.emitters, false, 'did not add listener on removed observable')
  t.end()
})

// do a rewrite of the dirty dirty on/off syntax
// its so mess it not even funny

// OVERWRITE TESTS √
// also need to perf test that shit

// RESOLVE TESTS <--- get this shit in here

//   remove.js         |    83.87 |       76 |      100 |    83.64 |... 56,76,77,78 | needs way more tests
//   storage.js        |    96.43 |    61.54 |      100 |    96.43 |             49 |
