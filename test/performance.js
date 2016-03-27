'use strict'
const Observable = require('../')
const Base = require('vigour-base')
const Observ = require('observ')
// const ObservStruct = require('observ-struct')
const test = require('tape')
const perf = require('vigour-performance').run
const vstamp = require('vigour-stamp')

var observableResult = 283
var createBase = 22
var objResult = 22
var amount = 3e6

const isPlainObj = require('vigour-util/is/plainobj')
const isObj = require('vigour-util/is/obj')
// amount = 1e6 // reuslt in 10 mil tests
// amount = 1

test.skip('observable', function (t) {
  const o = new Observable({ key: 'o', val: 0 })
  var callCount = 0
  var cnt = 0
  o.on(() => ++callCount)
  perf(() => {
    for (var i = 0; i < amount; i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-updates (sets)', ms + 'ms', callCount)
    observableResult = ms
    t.end()
  }, 1)
})

test.skip('observable-instances', function (t) {
  const o = new Observable({ key: 'o', val: 0 })
  var callCount = 0
  var cnt = 0
  var o1 = new o.Constructor()
  var o2 = new o1.Constructor()
  var o3 = new o2.Constructor()
  o.on(() => ++callCount)
  perf(() => {
    var a = Math.round(amount/4)
    for (var i = 0; i < (a); i++) {
      o.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-updates (sets)', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test('create-normal-object', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = { val: i }
    }
  }, (ms) => {
    objResult = ms
    //Math.round(ms / observableResult * 100) + '%'
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

test('is-plain', function (t) {
  perf(() => {
    var obj = {}
    for (var i = 0; i < amount; i++) {
      var a = isPlainObj(obj)
    }
  }, (ms) => {
    console.log('run is plain', ms + 'ms', 'vs creating base', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})


var isObjresult
test('is-obj', function (t) {
  perf(() => {
    var obj = {}
    for (var i = 0; i < amount; i++) {
      var a = isObj(obj)
    }
  }, (ms) => {
    isObjresult = ms
    console.log('run is obj', ms + 'ms', 'vs creating base', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})

//var isObject = require('is-object');

// obj && typeof obj === 'object' && !obj._base_version

// have to do this straight saves betweeb 5 - 8% and rly need to get this faster
test('is-obj-direct', function (t) {
  perf(() => {
    var obj = {}
    for (var i = 0; i < amount; i++) {
      var a = obj && typeof obj === 'object' && !obj._base_version
    }
  }, (ms) => {
    console.log('run is obj (direct)', ms + 'ms', 'vs creating isObjresult', Math.round(ms / isObjresult * 100) + '%')
    t.end()
  })
})

test('create-observable (and set using false)', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = new Observable(i, false)
    }
  }, (ms) => {
    console.log('create vigour-observable (false)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  }, 1)
})

test.skip('create/close stamps', function (t) {
  perf(() => {
    var c = vstamp.create
    var end = vstamp.close
    for (var i = 0; i < amount; i++) {
      var s = c()
      end(s)
    }
  }, (ms) => {
    console.log('vigour-stamp (create/close stamps)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  }, 1)
})

test.skip('create-observable (and set creating stamps)', function (t) {
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

test('create-base-keys', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = new Base({ a: i })
    }
  }, (ms) => {
    console.log('create-base-keys', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})

test('create-observable-keys', function (t) {
  perf(() => {
    for (var i = 0; i < amount; i++) {
      var a = new Observable({ a: i }, false)
    }
  }, (ms) => {
    console.log('create-observable-keys (no-stamp)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
    t.end()
  })
})

// make this all reusable -- after this time for setKey etc
// then clean up path
// then do reference

test.skip('observable-1-level-emit', function (t) {
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

test.skip('observable-2-level-emit', function (t) {
  // becomes slower because of context while loops :(
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

test.skip('observable-context', function (t) {
  const o = new Observable({ key: 'o', a: { b: 0 } })
  var callCount = 0
  var cnt = 0
  // console.log(this.path())
  o.a.b.on(
    function () {
      ++callCount
    }
  )
  const o1 = new o.Constructor({ key: 'oooooo' })
  perf(() => {
    // o.a.b.set('hehe')
    var l = Math.round(amount / 2)
    for (var i = 0; i < l; i++) {
      o._a._b.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-cntx-1', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test.skip('double observable-context', function (t) {
  const o = new Observable({ key: 'o', a: { b: 0 } })
  var callCount = 0
  var cnt = 0
  o.a.b.on(
    function () {
      ++callCount
    }
  )
  const o1 = new o.Constructor({ key: 'oooooo'})
  const o3 = new Observable({
    nested: { nest: { useVal: new o1.Constructor() } }
  })
  perf(() => {
    // o.a.b.set('hehe')
    var l = Math.round(amount / 3)
    for (var i = 0; i < l; i++) {
      o._a._b.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-cntx-2', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test.skip('triple observable-context', function (t) {
  const o = new Observable({ key: 'o', a: { b: 0 } })
  var callCount = 0
  var cnt = 0
  o.a.b.on(
    function () {
      ++callCount
    }
  )
  const o1 = new o.Constructor({ key: 'oooooo' })
  const o3 = new Observable({ key: 'o3', nested: { nest1: { nest2: { useVal: new o1.Constructor() } } } })
  const o4 = new o3.Constructor({ key: 'o4' })
  // overwrite /w same
  perf(() => {
    // o.a.b.set('hehe')
    var l = Math.round(amount / 4)
    for (var i = 0; i < l; i++) {
      o._a._b.set(++cnt)
    }
  }, (ms) => {
    console.log('vigour-observable-cntx-3', ms + 'ms', callCount, Math.round(ms / observableResult * 100) + '%')
    t.end()
  }, 1)
})

test.skip('observ', function (t) {
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

test.skip('base-observ', function (t) {
  // simmilair construct will be used for state / element
  const o = new Base({
    set (val, stamp) {
      var on = this._on
      if (on) {
        for (let i = 0, len = on.length; i < len; i++) {
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

test.skip('observable-set-hook (used for element/state)', function (t) {
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
