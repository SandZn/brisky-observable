'use strict'
const Observable = require('../')
const Base = require('vigour-base')
const Observ = require('observ')
// const ObservStruct = require('observ-struct')
const test = require('tape')
const perf = require('vigour-performance').run

var observResult
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

test('observ', function (t) {
  const o = Observ(0)
  var callCount = 0
  var cnt = 0
  o(() => ++callCount)
  o(() => ++callCount)
  perf(() => o.set(++cnt), (ms) => {
    console.log('observ', ms + 'ms', callCount)
    observResult = ms
    t.end()
  }, amount)
})

// test('base-observer', function (t) {
//   const _set = Base.prototype.set
//   const o = new Base({
//     define: {
//       set (val) {
//         var on = this._on
//         if (on) {
//           for (var i = 0, len = on.length; i < len; i++) {
//             on[i](val)
//           }
//         }
//         return _set.apply(this, arguments)
//       },
//       on (fn) {
//         if (!this._on) {
//           this._on = []
//         }
//         this._on.push(fn)
//       }
//     }
//   })
//   var cnt = 0
//   var callCount = 0
//   o.on(() => ++callCount)
//   o.on(() => ++callCount)
//   perf(() => o.set(++cnt), (ms) => {
//     console.log('vigour-base-observer', ms + 'ms', callCount, Math.round((ms / observResult) * 100) + '%')
//     t.end()
//   }, amount)
// })

test('observable', function (t) {
  const o = new Observable(0)
  var callCount = 0
  var cnt = 0
  o.on(() => ++callCount)
  o.on(() => ++callCount)
  // can optmize instances lot more pretty sure!
  // const o1 = new o.Constructor()
  // const o2 = new o1.Constructor()
  const o1 = new o.Constructor({
    key: 'o1',
    on: {
      data: {
        2: function () {
          ++callCount
        }
      }
    }
  })
  console.log(o1)
  console.log(o1._on.data === o._on.data)
  console.log(o1._on.data.fn === o._on.data.fn)
  // const o2 = new o1.Constructor()
  // const o3 = new o2.Constructor()
  perf(() => o.set(++cnt), (ms) => {
    console.log('vigour-observable', ms + 'ms', callCount, Math.round((ms / observResult) * 100) + '%')
    t.end()
  }, Math.round(amount / 2))
})
