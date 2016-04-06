'use strict'
const Observable = require('../../')
const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e6

var base = new Base(1)
function computeBase () {
  base.set(base.val + 1)
  for (var i in amount) {
    base.compute()
  }
}

var obs = new Observable(1)
function computeObservable () {
  obs.set(obs.val + 1)
  for (var i in amount) {
    base.compute()
  }
}

// 1.25 is slower then
perf(emitObservable, emitObserv, 1.25)
// also need a setup function unfortunately
// emitting other stuff
