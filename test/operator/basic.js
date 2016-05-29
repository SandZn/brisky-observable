'use strict'
var Observable = require('../../')
var test = require('tape')

test('operator transform, add', function (t) {
  var transformStart

  const b = new Observable('-b')

  const a = new Observable({
    val: 'a',
    $add: b
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
    }
  })
  t.equal(obs.compute(), '100-$transform-obs-a-b-$add', 'correct output')
  obs.compute('start!')
  t.equal(transformStart, 'start!', 'correct start value')
  t.end()
})
