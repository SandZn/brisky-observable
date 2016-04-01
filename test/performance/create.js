const Base = require('vigour-base')
const Observable = require('../../')
const test = require('vigour-performance')
var amount = 1e6

function createNormalObject () {
  for (var i = 0; i < amount; i++) {
    var a = { val: i } //eslint-disable-line
  }
}

function createBase () {
  for (var i = 0; i < amount; i++) {
    var a = new Base(i) //eslint-disable-line
  }
}

function createBaseKeys () {
  var am = Math.round(amount / 2)
  for (var i = 0; i < am; i++) {
    var a = new Base({ a: i }) //eslint-disable-line
  }
}

function createObservable () {
  for (var i = 0; i < amount; i++) {
    var a = new Observable(i) //eslint-disable-line
  }
}

function createObservableKeys () {
  var am = Math.round(amount / 2)
  for (var i = 0; i < am; i++) {
    var a = new Observable({ a: i }) //eslint-disable-line
  }
}

test(createBase, createNormalObject, 5)
test(createBaseKeys, createBase, 3)
test(createObservable, createBase, 3)
test(createObservableKeys, createObservable, 3)
