'use strict'
var Observable = require('../')
var test = require('tape')
var vstamp = require('vigour-stamp')

test('remove', function (t) {
  var top = 0
  var remove = 0
  var deep = 0
  var obs = new Observable({
    key: 'obs',
    a: { on: { data () { deep++ } } },
    b: true,
    on: {
      remove () { remove++ },
      data () { top++ }
    }
  })
  var instance = new obs.Constructor({ key: 'instance' }, false) // eslint-disable-line
  t.plan(5)
  obs.b.remove()
  t.equal(top, 2, 'removed nested field fire for instances')
  obs.once((val, stamp) => {
    t.equal(val, null, 'val equals null')
    t.equal(stamp, vstamp.cnt, 'correct stamp')
  })
  obs.remove()
  t.equal(top, 4, 'removed nested field fire for instances')
  t.equal(remove, 2, 'removed obs fire for instances')
})
