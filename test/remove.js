'use strict'
var Observable = require('../')
var test = require('tape')

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
  t.plan(1)
  obs.b.remove()
  t.equal(top, 2, 'remove nested field fire for instances')
})
