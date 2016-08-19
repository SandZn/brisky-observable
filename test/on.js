'use strict'
const Observable = require('../')
const test = require('tape')

test('on - basic', (t) => {
  const obs = new Observable()
  obs.on('data', () => {})
  t.equal('data' in obs.emitters, true, 'added data listener')
  obs.on('special', () => {})
  t.equal('special' in obs.emitters, true, 'added special listener')
  t.end()
})

test('on - remove listener trough set notation', (t) => {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.equal('a' in obs._emitters.data.fn, true, 'add fn listener a')
  obs.set({ on: { data: { a: null } } })
  t.equal(obs._emitters.data.fn.a, null, 'removed fn listener a')
  t.end()
})

test('on - overwrite existing key on different type', (t) => {
  const obs = new Observable({ on: { data: { a () {} } } })
  t.same(obs.emitters.data.fn.keys(), [ 'a' ], 'add fn listener a')
  obs.set({ on: { data: { a: [ () => {} ] } } })
  t.same(obs.emitters.data.attach.keys(), [ 'a' ], 'add attach listener a')
  // make this efficient!
  t.same(obs.emitters.data.fn.keys(), [], 'remove fn listener a')
  t.end()
})

test('on - add listener to a removed target', (t) => {
  const obs = new Observable()
  obs.remove()
  obs.set({ data: { g () {} } })
  t.equal('data' in obs.emitters, false, 'did not add listener on removed observable')
  t.end()
})

test('on - removed target', (t) => {
  const obs = new Observable()
  obs.remove()
  obs.set({ data: { g () {} } })
  t.equal('data' in obs.emitters, false, 'did not add listener on removed observable')
  t.end()
})

test('on - resolve context (method)', (t) => {
  const obs = new Observable({ a: { on: { data () {} } } })
  const instance = new obs.Constructor({ key: 'instance' })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn has val')
  instance.a.on(() => {})
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn does not get extra listeners')
  t.same(instance.a.emitters.data.fn.keys(), [ 'val', 1 ], 'instance has extra listener')
  t.ok(instance.a.hasOwnProperty('_emitters'), 'instance has own emitters')
  t.ok(instance.a._emitters.hasOwnProperty('_data'), 'emitters own data property')
  t.ok(instance.a._emitters._data.hasOwnProperty('fn'), 'data property has own fn')
  t.end()
})

test('on - resolve context (set)', (t) => {
  const obs = new Observable({ a: { on: { data () {} } } })
  const instance = new obs.Constructor({ key: 'instance' })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn has val')
  instance.set({ a: { on: { data: { 1 () {} } } } })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn does not get extra listeners')
  t.same(instance.a.emitters.data.fn.keys(), [ 'val', '1' ], 'instance has extra listener')
  t.ok(instance.a.hasOwnProperty('_emitters'), 'instance has own emitters')
  t.ok(instance.a._emitters.hasOwnProperty('_data'), 'emitters own data property')
  t.ok(instance.a._emitters._data.hasOwnProperty('fn'), 'data property has own fn')
  t.end()
})

test('on - resolve context remove (set)', (t) => {
  const obs = new Observable({ a: { on: { data () {} } } })
  const instance = new obs.Constructor({ key: 'instance' })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn has val')
  instance.set({ a: { on: { data: null } } })
  t.same(obs.a.emitters.data.fn.keys(), [ 'val' ], 'data.fn does not get extra listeners')
  t.same(instance.a._emitters.data, null, 'instance does not have data emitter')
  t.ok(instance.a.hasOwnProperty('_emitters'), 'instance has own emitters')
  t.ok(instance.a._emitters.hasOwnProperty('_data'), 'emitters own data property')
  t.end()
})
