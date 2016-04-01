'use strict'
const Observable = require('../../')
const Observ = require('observ')
const test = require('tape')
const perf = require('vigour-performance').run
var observbaseLine = 0
var observableResult = 0
var amount = 1e6

// make this a bit nicer
test('observ', function (t) {
  const o = Observ(0)
  var callCount = 0
  var cnt = 0
  o(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    observbaseLine = ms
    console.log('observ', ms + 'ms', callCount)
    t.end()
  }, 1)
})

test('observable', function (t) {
  const o = new Observable({ key: 'o', val: 0 })
  var callCount = 0
  var cnt = 0
  o.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-updates (sets)', ms + 'ms', callCount, Math.round(ms / observbaseLine * 100) + '%')
    observableResult = ms
    t.end()
  }, 1)
})
