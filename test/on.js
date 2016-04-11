'use strict'
const Base = require('vigour-base')
const Observable = require('../')
const test = require('tape')

test('base - has correct keys', function (t) {
  var BaseExample = new Base({
    something: true,
    hello: '?'
  })
  // BaseExample.set({ Child: 'Constructor' })
  // BaseExample = BaseExample.Constructor

  console.log('?', BaseExample.something)
  var a = new BaseExample.Constructor({
    b: {
      c: {
        something: { hello () {} }
      }
    }
  })
  console.log(BaseExample.Constructor.prototype)
  console.log(BaseExample.something, a, a instanceof BaseExample.Constructor, a.hello)
  t.equal(a.something.keys(), false, 'a keys are false')
  t.equal(a.b.something.keys(), false, 'a.b keys are false')
  t.deepEqual(a.b.c.something.keys(), [ 'hello' ], 'a.b.c keys equal [ "hello" ]')
  t.end()
})

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
