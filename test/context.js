'use strict'
const Observable = require('../')
const test = require('tape')

test('basic context case', function (t) {
  var callCount = 0
  const obs = new Observable({
    on: {
      data () { callCount++ }
    },
    Child: 'Constructor'
  })
  const a = new obs.Constructor()
  t.plan(3)
  callCount = 0
  a.set({ b: true })
  t.equal(callCount, 2, 'setting a nested field to true fires twice')
  callCount = 0
  a.set({ c: {} })
  t.equal(callCount, 2, 'setting a nested field to an empty object fires twice')
  callCount = 0
  a.set({ c: {} })
  t.equal(callCount, 0, 'setting an empty object should not fire')
})

test('child constructors and context', function (t) {
  t.plan(1)
  var Obs = new Observable({ Child: 'Constructor' }).Constructor
  var keys = {}
  var injectable = {
    api: {
      type: 'observable',
      types: {
        api: {
          on: {
            data: {
              api () {
                let key = this.origin().key
                !keys[key] ? keys[key] = 1 : keys[key]++
              }
            }
          }
        }
      },
      Child: { type: 'api' },
      language: true
    }
  }
  Obs.prototype.inject(injectable)
  var o = new Obs()
  var ref = new Obs({ key: 'ref' })
  o.api.language.set(ref)
  t.equal(keys.ref, 1, 'fired for instance')
})

test('context override', function (t) {
  t.plan(4)
  var cnt = 0
  var deepCnt = 0
  var Template = new Observable({
    key: 'template',
    noContextField: {
      noContext: true,
      on: { data () { cnt++ } },
      deep: {
        on: { data () { deepCnt++ } }
      }
    }
  }).Constructor
  var aTemplate = new Template({ key: 'aTemplate' })
  t.equal(
    aTemplate.noContextField.path()[0],
    'template',
    'getting noContextField does not get a context path'
  )
  aTemplate.noContextField.set('hello')
  t.equal(
    Template.prototype.noContextField.compute(),
    'hello',
    'setting noContextField does not resolve context'
  )
  t.equal(cnt, 1, 'setting noContextField fires once')
  aTemplate.noContextField.deep.set('hello')
  t.equal(deepCnt, 1, 'setting noContextField fires once for deep fields')
})

test('resolve', function (t) {
  t.plan(4)
  var prev = {}
  var cnt = { a: 0, a2: 0, c: 0 }
  var a = new Observable({
    key: 'a',
    b: {
      on: { data () { cnt[this.path()[0]]++ } }
    },
    c: {
      on: { data () { cnt.c++ } }
    }
  })
  var a2 = new a.Constructor({ key: 'a2' }, false)

  testContext(
    () => a2.b.set(true), 0, 1, 0, 'resolve context')
  t.equal(a2.b !== a.b, true, 'a2.b is resolved')
  testContext(() => a2.b.set(false), 0, 1, 0, 'set on resolved context')
  testContext(() => a.c.remove(), 0, 0, 2, 'remove field from original')

  function testContext (fn, a, a2, c, label) {
    for (var i in cnt) {
      prev[i] = cnt[i]
    }
    fn()
    t.deepEqual(cnt, { a: prev.a + a, a2: prev.a2 + a2, c: prev.c + c }, label)
  }
})
