'use strict'
const Observable = require('../')
const test = require('tape')

test('once', (t) => {
  var callCount = 0
  const obs = new Observable({ a: true })
  obs.a.once(() => { callCount += 1 })
  obs.a.set({ val: false })
  obs.a.set({ val: true })
  t.equal(callCount, 1, 'fires once for function listener')
  t.end()
})

test('once - special emitter', (t) => {
  var callCount = 0
  const obs = new Observable({ a: true })
  obs.a.once('special', () => { callCount += 1 })
  obs.a.emit('special')
  obs.a.emit('special')
  t.equal(callCount, 1, 'fires once for function listener')
  t.end()
})

test('once - instances', (t) => {
  var callCount = 0
  const obs = new Observable({ a: true })
  const instance = new obs.Constructor() //eslint-disable-line
  obs.a.once(() => { callCount += 1 })
  obs.a.set({ val: false })
  obs.a.set({ val: true })
  t.equal(callCount, 1, 'fires for constructor and instance')
  t.end()
})

test('once - attach', (t) => {
  var callCount = 0
  const obs = new Observable({ a: true })
  const attach = new Observable()
  obs.a.once([ () => { callCount += 1 }, attach ])
  obs.a.set(false)
  obs.a.set(true)
  t.equal(callCount, 1, 'fires once for attach listener')
  obs.a.once([ () => { callCount += 1 }, attach ])
  attach.remove()
  t.same(obs.a._emitters.data.attach.keys(), [], 'removing attach removes once listener')
  t.end()
})

test('once - base', (t) => {
  var callCount = 0
  const obs = new Observable({ a: true })
  const other = new Observable()
  other.on(() => { callCount++ })
  obs.a.once(other)
  obs.a.set(false)
  obs.a.set(true)
  t.equal(callCount, 1, 'fires once for attach listener')
  t.end()
})

test('once - double', (t) => {
  var callCount = 0
  var normalCount = 0
  const obs = new Observable({ a: true })
  obs.a.on(() => { normalCount++ })
  obs.a.once(() => { callCount++ })
  obs.a.on(() => { normalCount++ })
  obs.a.once(() => { callCount++ })
  obs.a.on(() => { normalCount++ })
  obs.a.set({ val: false })
  t.equal(callCount, 2, 'fires both once listenes')
  t.equal(normalCount, 3, 'fires all normal listeners')
  t.equal(obs.a.emitters.data.fn.keys().length, 3, 'removed once listeners')
  t.end()
})

test('once - add listener to a removed target', (t) => {
  const obs = new Observable()
  obs.remove()
  obs.once(() => {})
  t.equal('data' in obs.emitters, false, 'did not add once listener on removed observable')
  t.end()
})
