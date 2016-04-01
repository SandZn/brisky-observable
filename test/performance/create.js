const Base = require('vigour-base')
const Observable = require('../../')
const test = require('tape')
const perf = require('vigour-performance')
var amount = 1e5

function createNormalObject () {
  for (var i = 0; i < amount; i++) {
    var a = { val: i }
  }
}

function createBase () {
  for (var i = 0; i < amount; i++) {
    var a = new Base(i)
  }
}

function createBaseKeys () {
  var am = Math.round(amount/2)
  for (var i = 0; i < am; i++) {
    var a = new Base({ a: i })
  }
}

perf(createBase, createNormalObject, 3)

// test('create-observable (and set creating stamps)', function (t) {
//   perf(() => {
//     // lets optmize this case
//     for (var i = 0; i < amount; i++) {
//       var a = new Observable(i)
//     }
//   }, (ms) => {
//     console.log('vigour-observable (create stamps)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
//     t.end()
//   }, 1)
// })

// test('create-observable-keys', function (t) {
//   perf(() => {
//     var am = Math.round(amount/2)
//     for (var i = 0; i < am; i++) {
//       var a = new Observable({ a: i }, false)
//     }
//   }, (ms) => {
//     console.log('create-observable-keys (no-stamp)', ms + 'ms', Math.round(ms / createBase * 100) + '%')
//     t.end()
//   })
// })
