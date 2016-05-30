'use strict'
const Base = require('vigour-base')
const perf = require('vigour-performance')
var amount = 1e6

var base = new Base({
  a: true,
  b: true,
  c: true
})

function keys () {
  for (var i = 0; i < amount; i++) {
    base.keys()
  }
}

perf(keys, function nothing () {}, 1, 100)
