'use strict'
const Observable = require('../')
const test = require('tape')
const vstamp = require('vigour-stamp')

test('remove', function (t) {
  var top = 0
  var deep = 0
  var remove = 0
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
  t.plan(9)
  obs.keys()
  obs.b.remove()
  t.same(keys, [ 'a', 'b' ], 'removed nested field correct keys -- includes in progress')
  t.same(obs.keys(), [ 'a' ], 'removed nested field correct keys -- after removal excludes in progress')
  t.equal(top, 2, 'removed nested field fire for instances')
  obs.once((val, stamp) => {
    t.equal(obs.val, null, 'fires when obs is removed')
    t.equal(val, null, 'val equals null')
    t.equal(stamp, vstamp.cnt, 'correct stamp')
  })
  obs.remove()
  t.equal(deep, 2, 'fired deep twice')
  t.equal(top, 4, 'removed nested field fire for instances')
  t.equal(remove, 2, 'removed obs fire for instances')
})

test('remove - fires data listeners when completed', function (t) {
  t.plan(1)
  const obs = new Observable({
    a: {},
    b: {},
    on: {
      data: {
        playStateItems (data, stamp) {
          vstamp.done(stamp, () => {
            const keys = this.keys()
            const count = keys.length
            t.equals(count, 1, 'correct number of keys')
          })
        }
      }
    }
  })
  obs.a.remove()
})

test('remove - context', function (t) {
  const obs = new Observable({
    child: {
      define: {
        extend: {
          contextRemove (method, key, stamp) {
            console.log('contextRemove:', key, stamp)
            return method.call(this, key, stamp)
          }
        }
      },
      child: 'Constructor'
    },
    a: {},
    b: { c: {} },
    d: { e: {} }
  })

  const instance = new obs.Constructor()
  instance.a.remove()
  t.ok(instance.hasOwnProperty('_a'), 'instance has own property "_a"')

  // instance.b.remove() <-- no this does not fire
  instance.set({
    b: {
      c: null
    }
  }, false)
  t.same(instance.b.c, null, 'removed instance b.c')
  t.ok(obs.b.c !== null, 'did not remove obs b.c')
  // make tests in base
  // this has to do context remove as well...
  // so this creates something and then removes it... not super efficient can jsut call contextRemove
  instance.d.e.remove()
  t.same(instance.d.e, null, 'removed instance d.e')
  t.ok(obs.d.e !== null, 'did not remove obs d.e')
  t.end()
})

test('remove - on other stamp', function (t) {
  const obs = new Observable({
    a: {
      on: {
        remove () {
          t.ok(true, 'fires remove listener from inhertied stamp')
          t.end()
        }
      }
    }
  })
  const stamp = vstamp.create()
  obs.a.remove(stamp)
  vstamp.close(stamp)
})

test('remove - gaurd against removed items', function (t) {
  const obs = new Observable({
    a: {
      on: {
        remove () {
          t.ok(true, 'fires remove listener from inhertied stamp')
          t.end()
        }
      }
    }
  })
  const stamp = vstamp.create()
  obs.remove(stamp)
  obs.remove()
})

test('remove - remove fires on nested observables', t => {
  var fires = 0
  const obs = new Observable({
    blerk: {
      sherk: {
        on: {
          remove () {
            fires++
          }
        }
      }
    }
  })
  obs.remove()
  t.equal(fires, 1, 'listener fired')
  t.end()
})
