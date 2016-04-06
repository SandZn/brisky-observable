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

var obs2 = new Observable({
  val: 1,
  $add: 1
})

function computeOperators () {
  for (var i = 0; i < amount; i++) {
    obs2.compute()
  }
}

perf(computeObservable, computeBase, 3)
perf(computeOperators, computeObservable, 3)
