'use strict'
var Observable = require('../../')
var test = require('tape')

test('operator - $type', function (t) {
  const obs = new Observable({
    val: 'hello',
    $type: 'boolean'
  })
  t.equal(obs.compute(), true, 'boolean - convert truthy to true')
  obs.set(void 0)
  t.equal(obs.compute(), false, 'boolean - convert base without a val to false')
  obs.$type.set('number')
  t.equal(obs.compute(), 0, 'number - convert base without a val to 0')
  obs.set(100)
  t.equal(obs.compute(), 100, 'number - number 100')
  obs.set('-100')
  t.equal(obs.compute(), -100, 'number - extracts number from numberlike -100')
  obs.set('hello:100')
  t.equal(obs.compute(), 100, 'number - extracts number from string 100')
  obs.$type.set('string')
  obs.set(void 0)
  t.equal(obs.compute(), '', 'string - convert base without a val to ""')
  obs.set(false)
  t.equal(obs.compute(), '', 'string - convert false to ""')
  obs.set(100)
  t.equal(typeof obs.compute(), 'string', 'string - convert 100 to "100"')
  obs.set('hello')
  t.equal(obs.compute(), 'hello', 'string - "hello"')
  obs.$type.set('email')
  t.equal(obs.compute(), false, 'email - convert "hello" to false')
  obs.set('email@email.com')
  t.equal(obs.compute(), 'email@email.com', 'email - "email@email.com" to "email@email.com"')
  obs.$type.set('url')
  t.equal(obs.compute(), false, 'url - convert "email@email.com" to false')
  obs.set('bla.bla.com')
  t.equal(obs.compute(), 'bla.bla.com', 'url - "bla.bla.com" to "bla.bla.com"')
  obs.$type.set({
    val: void 0,
    range: [ 100, 1000 ]
  })
  t.equal(obs.compute(), 100, 'range - "bla.bla.com" to 100 (lower bound)')
  obs.set(2000)
  t.equal(obs.compute(), 1000, 'range - 2000 to 1000')
  obs.set('haha:200')
  t.equal(obs.compute(), 200, 'range - "haha:200" to 200')
  t.end()
})
