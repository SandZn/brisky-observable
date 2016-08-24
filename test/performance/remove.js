'use strict'
const Observable = require('../../')
// const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e5

function remove () {
  for (let i = 0; i < amount; i++) {
    let x = new Observable()
    // base remove is a-ok
    x.remove()
  }
}

function removeNoListeners () {
  for (let i = 0; i < amount; i++) {
    let x = new Observable()
    // base remove is a-ok
    x.remove(false)
  }
}

function create () {
  for (let i = 0; i < amount; i++) {
    new Observable() //eslint-disable-line
  }
}

// create is rly rly fast 100k 4ms
// perf(create, function x() {})
// remove and create, remove fires listener
// remove is a lto slower since it has to loop trough emitters for example *using hasownprop)
perf(removeNoListeners, create, 7)
perf(remove, removeNoListeners, 4)
