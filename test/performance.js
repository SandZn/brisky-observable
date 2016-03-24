'use strict'
const Observable = require('../')
const Base = require('vigour-base')
const Observ = require('observ')
// const ObservStruct = require('observ-struct')
const test = require('tape')
const perf = require('vigour-performance').run

var observableResult
var amount = 1e6

// test('base', function (t) {
//   const o = new Base()
//   var cnt = 0
//   // optmize this as well but later
//   perf(() => o.set(++cnt), (ms) => {
//     console.log('vigour-base', ms + 'ms')
//     t.end()
//   }, amount)
// })
test('observable', function (t) {
  const o = new Observable({ key: 'o', val: 0 })
  var callCount = 0
  var cnt = 0
  o.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable', ms + 'ms', callCount)
    observableResult = ms
    t.end()
  }, 1)
})

test('observable-1-level-emit', function (t) {
  const o = new Observable({ key: 'o', a: 0 })
  var callCount = 0
  var cnt = 0
  o.a.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.a.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test('observable-2-level-emit', function (t) {
  // becomes slower because of context
  const o = new Observable({ key: 'o', a: { b: 0 } })
  var callCount = 0
  var cnt = 0
  o.a.b.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.a.b.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test('observ', function (t) {
  const o = Observ(0)
  var callCount = 0
  var cnt = 0
  o(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('observ', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test('observable-observ (used for element/state)', function (t) {
  // simmilair construct will be used for state / element
  var cnt = 0
  var callCount = 0
  const o = new Base({
    set (val, stamp) {
      ++callCount
    }
  })
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-observ', ms + 'ms', callCount, Math.round((ms / observableResult) * 100) + '%')
    t.end()
  }, 1)
})

test('base-observ', function (t) {
  // simmilair construct will be used for state / element
  const o = new Base({
    set (val, stamp) {
      var on = this._on
      if (on) {
        for (var i = 0, len = on.length; i < len; i++) {
          on[i](val)
        }
      }
    },
    define: {
      on (fn) {
        if (!this._on) { this._on = [] }
        this._on.push(fn)
      }
    }
  })
  var cnt = 0
  var callCount = 0
  o.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-base-observ', ms + 'ms', callCount, Math.round((ms / observableResult) * 100) + '%')
    t.end()
  }, 1)
})
