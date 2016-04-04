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
  t.plan(3)
  var a, b
  var store = Array.prototype.slice
  const other = new Observable({ key: 'other' })
  const obs = new Observable({
    key: 'obs',
    on: {
      data: {
        a: [ function () {
          a = store.call(arguments)
        }, other ],
        b: [ function () {
          b = store.call(arguments)
        }, other, 'extra']
      }
    }
  })
  obs.set(true, 'stamp')
  t.deepEqual(a, [ true, 'stamp', other ], 'set obs to "true", attach fires')
  // want to stop supporting this!
  // only thing you can attach has to be an observable
  // also call it bind -- make the syntax easier to use as well
  // maybe add it as a part of base ref listener? what abotu not using arrays but an object
  t.deepEqual(b, [ true, 'stamp', other, 'extra' ], 'multiple attach arguments get passed')
  other.remove()
  t.equal(obs.__on.data.attach.keys(), false, 'removing the attached base removes listeners')
})

// add some perf tests as well -- but do this later!
