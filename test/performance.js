'use strict'
const Observable = require('../')
const test = require('tape')
const perf = require('./test').perf

test('on', function (t) {
  const obs = new Observable()
  var callCount = 0
  var cnt = 0
  obs.on(() => ++callCount)

  perf(() => obs.set(++cnt), (ms) => console.log(ms))

  t.end()
})
