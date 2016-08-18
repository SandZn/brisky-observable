'use strict'
var Observable = require('../')
var test = require('tape')

test('off - remove listener by key', function (t) {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.same(obs.emitters.data.fn.keys(), [ 'a' ], 'add fn listener a')
  obs.off('data', 'a')
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

// do a rewrite of the dirty dirty on/off syntax
// its so mess it not even funny
