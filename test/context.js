'use strict'
const Observable = require('../')
const test = require('tape')

test('child constructors and context', function (t) {
  t.plan(1)
  var Obs = new Observable({
    define: {
      handleContextChild (data, event, context) {
        this.clearContext()
        this.emit('data', data, event)
      }
    },
    on: {
      data () {}
    },
    Child: 'Constructor'
  }).Constructor
  var keys = {}
  var injectable = {
    api: {
      type: 'observable',
      components: {
        api: {
          on: {
            data: {
              api () {
                let key = this.origin.key
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
  o.api.language.val = ref
  t.equal(keys.ref, 1, 'fired for instance')
})

test('context override', function (t) {
  t.plan(4)
  var cnt = 0
  var deepCnt = 0
  var Template = new Observable({
    key: 'template',
    trackInstances: true,
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
    aTemplate.noContextField.path[0],
    'template',
    'getting noContextField does not get a context path'
  )
  aTemplate.noContextField.set('hello')
  t.equal(
    Template.prototype.noContextField.val,
    'hello',
    'setting noContextField does not resolve context'
  )
  t.equal(cnt, 1, 'setting noContextField fires once')
  aTemplate.noContextField.deep.val = 'hello'
  t.equal(deepCnt, 1, 'setting noContextField fires once for deep fields')
})
