'use strict'

var Observable = require('../')
var test = require('tape')

test('once', function (t) {
  var callCount = 0
  var obs = new Observable({
    a: true
  })
  obs.a.once(function () {
    callCount += 1
  })

  t.plan(1)
  obs.a.set({ val: false })
  obs.a.set({ val: true })
  t.equal(callCount, 1)
})
