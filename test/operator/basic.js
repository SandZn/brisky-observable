'use strict'
var Observable = require('../../')
var test = require('tape')

test('operator - $transform, $add and $prepend', function (t) {
  t.plan(3)
  var transformStart
  const b = new Observable('b-')
  const a = new Observable({
    val: 'a',
    $prepend: b
  })
  const obs = new Observable({
    val: 'obs-',
    random: 100,
    $add: {
      val: a,
      $add: '-$add'
    },
    $transform (val, start) {
      transformStart = start
      return this.random.compute() + '-$transform-' + val
    },
    on: {
      data () {
        t.equal(this.compute(), '100-$transform-obs-B-a-$add', 'updates after set on reference')
      }
    }
  })
  t.equal(obs.compute(), '100-$transform-obs-b-a-$add', 'correct output')
  obs.compute('start!')
  t.equal(transformStart, 'start!', 'correct start value')
  b.set('B-')
})

test('operator - $transform - object', function (t) {
  const obs = new Observable({
    child: { special: 'lulz' },
    $transform (val, start) {
      return { field: 'hello' }
    }
  })
  t.same(
    obs.compute().serialize(),
    {
      field: {
        val: 'hello',
        special: 'lulz'
      }
    },
    'correct output'
  )
  const b = new Observable({ key: 'b' })
  const obs2 = new Observable({
    $transform: b
  })
  t.same(obs2.compute().serialize(), {}, 'outputs base')
  t.end()
})

test('operator - $transform - null', function (t) {
  const obs = new Observable({
    val: 'hello',
    $add: 'bla',
    $transform (val, start) {
      return null
    }
  })
  t.equal(obs.compute(), obs, 'ignore operators on $transform null')
  t.end()
})

test('operator - $transform - context', function (t) {
  const obs = new Observable({
    noReference: true,
    $transform (val, start) {
      return this.path().join('-') + '-hello'
    }
  })
  const obs2 = new Observable({
    a: {
      b: {
        c: obs
      }
    }
  })
  const obs3 = new obs2.Constructor({ key: 'obs3' })
  t.equal(obs3.a.b.c.compute(), 'obs3-a-b-c-hello', 'correct context')
  t.end()
})
