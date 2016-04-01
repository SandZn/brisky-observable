'use strict'
const Observable = require('../../')
const Observ = require('observ')
const perf = require('vigour-performance')
var amount = 1e6

const observr = Observ(0)
var observrCallCount = 0
observr(() => ++observrCallCount)

function observ () {
  for (var i = 0; i < amount; i++) {
    observr.set(i)
  }
}

const obs = new Observable(0)
var obsCallCount = 0
obs.on(() => ++obsCallCount)

function observable () {
  for (var i = 0; i < amount; i++) {
    obs.set(i)
  }
}

perf(observable, observ, 1.25)
