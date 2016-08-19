'use strict'
const Observable = require('../')
const test = require('tape')

test('off - remove listener by key and function', (t) => {
  function labelled () {}
  const attach = new Observable()
  const obs = new Observable({
    on: {
      data: {
        a () {},
        b: labelled,
        c: [ labelled, attach ]
      }
    }
  })
  t.same(obs.emitters.data.fn.keys(), [ 'a', 'b' ], 'add fn listener a, b')
  t.same(obs.emitters.data.attach.keys(), [ 'c' ], 'add attach listener c')
  obs.off('data', 'a')
  obs.off(labelled)
  t.same(obs.emitters.data.attach.keys(), [], 'remove attach listener c')
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

test('off - key', (t) => {
  const obs = new Observable({
    on: {
      data () {},
      special () {}
    }
  })
  obs.off(false, 'val')
  t.same(obs.emitters.data.fn.keys(), [], 'removed emitters on data')
  t.same(obs.emitters.special.fn.keys(), [], 'removed emitters on data')
  t.end()
})

test('off - resolve context (method)', (t) => {
  const obs = new Observable({ a: { on: { data () {} } } })
  const instance = new obs.Constructor({ key: 'instance' })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn has val')
  instance.a.off('data')
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn does not get extra listeners')
  t.same(instance.a.emitters.data.fn.keys(), [], 'instance has extra listener')
  t.ok(instance.a.hasOwnProperty('_emitters'), 'instance has own emitters')
  t.ok(instance.a._emitters.hasOwnProperty('_data'), 'emitters own data property')
  t.ok(instance.a._emitters._data.hasOwnProperty('fn'), 'data property has own fn')
  t.end()
})

test('off - remove all emitters', (t) => {
  const obs = new Observable({
    on: {
      data () {},
      special () {}
    }
  })
  obs.off()
  t.same(obs.emitters, null, 'removed emitters')
  t.end()
})
