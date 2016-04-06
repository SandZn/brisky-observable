'use strict'
const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e6

var base = new Base({
  a: true,
  b: true,
  c: true
})

function keysInternal () {
  for (var i = 0; i < amount; i++) {
    base.keysInternal(base._keys, '_keys', base.keysCheck)
  }
}

function keys () {
  for (var i = 0; i < amount; i++) {
    base.keys()
  }
}

perf(keysInternal, keys, 1, 100)
