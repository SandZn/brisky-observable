'use strict'
var Observable = require('../')
var test = require('tape')

test('references, keys and remove', function (t) {
  var fired = 0
  var obs = new Observable({
    a: true,
    properties: { b: true },
    on: {
      data () {
        console.log('yo?')
        fired++
      }
    }
  })
  t.plan(5)
  t.equal(obs.keys().length, 1, 'has correct keys length')
  var reference = new Observable()
  obs.set(reference)
  t.equal(fired, 1, 'setting obs to a reference fires listener')
  t.equal(obs.val, reference, 'obs input equals reference')
  reference.set(void 0)
  t.equal(fired, 2, 'setting reference to void 0 fires listener')
  t.equal(reference.val, void 0, 'reference input equals void 0')
})
