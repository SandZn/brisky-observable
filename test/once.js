'use strict'
var Observable = require('../')
var test = require('tape')

test('once', function (t) {
  var callCount = 0
  const obs = new Observable({ a: true })
  obs.a.once(function () { callCount += 1 })
  t.plan(3)
  obs.a.set({ val: false })
  obs.a.set({ val: true })
  t.equal(callCount, 1, 'fires once for function listener')
  callCount = 0
  const attach = new Observable()
  obs.a.once([ function () { callCount += 1 }, attach ])
  obs.a.set(false)
  obs.a.set(true)
  t.equal(callCount, 1, 'fires once for attach listener')
  obs.a.once([ function () { callCount += 1 }, attach ])
  attach.remove()
  t.equal(obs.a.__on.data.attach.keys(), false, 'remeving attach removes once listener')
})
