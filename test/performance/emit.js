'use strict'
const Observable = require('../../')
const Observ = require('observ')
const perf = require('vigour-performance')
var amount = 1e6

const observr = Observ(0)
var observrCallCount = 0
observr(() => ++observrCallCount)

function emitObserv () {
  for (var i = 0; i < amount; i++) {
    observr.set(i)
  }
}

const obs = new Observable(0)
global.obsCallCount = 0
obs.on(() => ++global.obsCallCount)

function emitObservable () {
  for (var i = 0; i < amount; i++) {
    obs.set(i)
  }
}

// 1.25 is slower then
perf(emitObservable, emitObserv, 1)
// also need a setup function unfortunately
// emitting other stuff
