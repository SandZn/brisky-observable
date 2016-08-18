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

// remove and create, remove fires listener
perf(remove, removeNoListeners, 4)
perf(remove, create, 30)
