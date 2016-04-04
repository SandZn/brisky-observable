'use strict'
var Observable = require('../')
var test = require('tape')

test('references, keys and remove', function (t) {
  var fired = 0
  const obs = new Observable({
    key: 'obs',
    a: true,
    properties: { b: true },
    on: { data () { fired++ } }
  })
  t.plan(5)
  t.equal(obs.keys().length, 1, 'has correct keys length')
  const reference = new Observable({ key: 'reference' })
  obs.set(reference)
  t.equal(fired, 1, 'setting obs to a reference fires listener')
  t.equal(obs.val, reference, 'obs val equals reference')
  reference.set(true)
  t.equal(fired, 2, 'setting reference to true fires listener')
  t.equal(obs.compute(), true, 'obs computed value equals "true"')
})

test('attach', function (t) {
  console.log('not there yet!')
  t.end()
})

// add some perf tests as well -- but do this later!
