'use strict'
const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e5

var base = new Base({
  a: true,
  b: true,
  c: true
})

function keysInternal () {
  for (var i = 0; i < amount; i++) {
    // base._keys = null
    base.keysInternal('_keys', base.keysCheck)
  }
}

function keys () {
  for (var i = 0; i < amount; i++) {
    // base._keys = null
    base.keys()
  }
}

perf(keysInternal, keys, 1, 100)
// also need a setup function unfortunately
// emitting other stuff
