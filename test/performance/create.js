const Observable = require('../../')
const Base = require('vigour-base')
const test = require('tape')
const perf = require('vigour-performance').run
var amount = 1e6
var objResult = 0
var createBase = 0

test('create-normal-object', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = { val: i }
    }
  }, (ms) => {
    objResult = ms
    // Math.round(ms / observableResult * 100) + '%'
    console.log('create-normal-object', ms + 'ms')
    t.end()
  })
})

test('create-base', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = new Base(i)
    }
  }, (ms) => {
    createBase = ms
    console.log('create-base', ms + 'ms', 'vs normal obj', Math.round(ms / objResult * 100) + '%')
    t.end()
  })
})

test('create-base-keys', function (t) {
  perf(() => {
    var am = Math.round(amount/2)
    for (var i = 0; i < am; i++) {
      var a = new Base({ a: i })
    }
  }, (ms) => {
    console.log('create-base-keys', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})

test('create-observable (and set creating stamps)', function (t) {
  perf(() => {
    // lets optmize this case
    for (var i = 0; i < amount; i++) {
      var a = new Observable(i)
    }
  }, (ms) => {
    console.log('vigour-observable (create stamps)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  }, 1)
})

test('create-observable-keys', function (t) {
  perf(() => {
    var am = Math.round(amount/2)
    for (var i = 0; i < am; i++) {
      var a = new Observable({ a: i }, false)
    }
  }, (ms) => {
    console.log('create-observable-keys (no-stamp)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})
