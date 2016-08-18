'use strict'
const Observable = require('../../')
const perf = require('vigour-performance')
var amount = 1e4

function createObservable () {
  for (var i = 0; i < amount; i++) {
    new Observable(i) //eslint-disable-line
  }
}

// rly fucking slow
function createObservableWithListener () {
  for (var i = 0; i < amount; i++) {
    let obs = new Observable()
    obs.on(() => {})
  }
}

function createObservableWithListenerSetObj () {
  for (var i = 0; i < amount; i++) {
    // 8 times slower fuck???
    new Observable({ on: { data () {} } }) //eslint-disable-line
  }
}

// add base, add attach
perf(createObservableWithListener, createObservable, 1.25)
perf(createObservableWithListenerSetObj, createObservableWithListener, 1.25)
