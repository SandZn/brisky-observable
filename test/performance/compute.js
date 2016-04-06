'use strict'
const Observable = require('../../')
const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e6

var base = new Base(1)
function computeBase () {
  base.set(base.val + 1)
  for (var i = 0; i < amount; i++) {
    base.compute()
  }
}

var obs = new Observable(1)
function computeObservable () {
  obs.set(obs.val + 1)
  for (var i = 0; i < amount; i++) {
    obs.compute()
  }
}

// 1.25 is slower then
console.log(base.compute(), obs.compute(), obs.keys('_operators'))
perf(computeObservable, computeBase, 1)
// also need a setup function unfortunately
// emitting other stuff
