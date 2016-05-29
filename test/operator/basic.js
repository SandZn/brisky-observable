'use strict'
var Observable = require('../')
var test = require('tape')

test('operator transform, add', function (t) {
  console.log('simple operator test')
  const b = new Observable('-b-')

  const a = new Observable({
    val: 'a',
    $add: b
  })

  const obs = new Observable({
    val: 'obs-',
    random: 100,
    $add: {
      val: a,
      $add: '-$add-'
    },
    $transform (val) {
      console.log('???', val)
      return this.random.compute() + '-$transform-' + val
    }
  })
  console.log(obs.compute(), obs.keys(), obs.keys('operator'))
})
