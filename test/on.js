'use strict'
var Observable = require('../')
var test = require('tape')

test('on - remove listener trough set notation', function (t) {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.equal('a' in obs.__on.data.fn, true, 'add fn listener a')
  obs.set({ on: { data: { a: null } } })
  t.equal(obs.__on.data.fn.a, null, 'removed fn listener a')
  t.end()
})
