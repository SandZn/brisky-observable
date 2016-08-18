'use strict'
var Observable = require('../')
var test = require('tape')

test('off - remove listener by key', (t) => {
  function labelled () {}
  const attach = new Observable()

  const obs = new Observable({
    on: {
      data: {
        a () {},
        b: labelled,
        c: [ labelled, attach ]
      }
    }
  })
  t.same(obs.emitters.data.fn.keys(), [ 'a', 'b' ], 'add fn listener a, b')
  t.same(obs.emitters.data.attach.keys(), [ 'c' ], 'add attach listener c')
  obs.off('data', 'a')
  obs.off('data', labelled)
  t.same(obs.emitters.data.attach.keys(), [], 'remove attach listener c')
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

// do a rewrite of the dirty dirty on/off syntax
// its so mess it not even funny

// OFF KEY TESTS -- NEED RESOLVE TESTS
