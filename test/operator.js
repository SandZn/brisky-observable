'use strict'
var Observable = require('../')
var test = require('tape')

test('operator', function (t) {
  console.log('----')
  var obs = new Observable({
    key: 'obs',
    $transform () {
      console.log('TRANSFORM!')
      return 'flabber'
    }
  })
  console.log(obs.compute())
  t.end()
})
