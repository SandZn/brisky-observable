'use strict'
const Observable = require('../')
const test = require('tape')

test('on - has correct keys', function (t) {
  const Obs = new Observable({
    Child: 'Constructor'
  }).Constructor
  var a = new Obs({
    b: {
      c: {
        on: { hello () {} }
      }
    }
  })
  t.equal(a._on.keys(), false, 'a keys are false')
  t.equal(a.b._on.keys(), false, 'a.b keys are false')
  t.deepEqual(a.b.c._on.keys(), [ 'hello' ], 'a.b.c keys equal [ "hello" ]')
  t.end()
})
