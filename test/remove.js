'use strict'
const Observable = require('../')
const test = require('tape')
const vstamp = require('vigour-stamp')

test('remove', function (t) {
  var top = 0
  var remove = 0
  var deep = 0
  var keys
  const obs = new Observable({
    key: 'obs',
    a: { on: { data () { deep++ } } },
    b: true,
    on: {
      remove () { remove++ },
      data () {
        top++
        keys = this.keys().concat() // just handle it in state?
      }
    }
  })
  const instance = new obs.Constructor({ key: 'instance' }, false) // eslint-disable-line
  t.plan(7)
  obs.keys()
  obs.b.remove()
  t.same(keys, [ 'a', 'b' ], 'removed nested field correct keys -- includes in progress')
  t.same(obs.keys(), [ 'a' ], 'removed nested field correct keys -- after removal excludes in progress')
  t.equal(top, 2, 'removed nested field fire for instances')
  obs.once((val, stamp) => {
    t.equal(val, null, 'val equals null')
    t.equal(stamp, vstamp.cnt, 'correct stamp')
  })
  obs.remove()
  t.equal(top, 4, 'removed nested field fire for instances')
  t.equal(remove, 2, 'removed obs fire for instances')
})
