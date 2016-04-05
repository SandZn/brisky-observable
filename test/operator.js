'use strict'
var Observable = require('../')
var test = require('tape')

test('operator primitive transform', function (t) {
  var someCondition = false
  const obs = new Observable({
    key: 'obs',
    val: 'value',
    $transform: {
      val (val) {
        return val.toUpperCase()
      },
      $condition () {
        return someCondition
      }
    }
  })
  t.equal(obs.compute(), 'value', 'does not transform when condition is falsy')
  someCondition = true
  t.equal(obs.compute(), 'VALUE', 'transforms to uppercase when condition is truthy')
  const obs2 = new Observable()
  obs.set({ $transform: { $condition: obs2 } })
  t.equal(obs.compute(), 'value', '$condition set to empty reference does not transform')
  obs.once(function () {
    t.equal(obs.compute(), 'VALUE', 'transforms to uppercase when reference is set to true, fires listener')
  })
  obs2.set(true)
  t.end()
})

test('operator using types', function (t) {
  const reference = new Observable(true)
  const Obs = new Observable({
    properties: {
      $someCase: {
        type: '$transform',
        $condition: reference
      }
    },
    Child: 'Constructor'
  }).Constructor
  const instance = new Obs({ field: { $someCase: 'hello' } })
  t.equal(instance.field.compute(), 'hello', 'nested $transform outputs "hello"')

  console.log('???????', reference.__c, reference)
  reference.set(false)
  // t.equal(instance.field.compute(), 'hello', 'nested $transform computes to correct result')
  console.log(instance.field.compute())
})

// time operator
// add / prepend / type
/*
properties: {
  $ios: {
    type: '$prepend', //give it a name add to base
    $condition {
      $: '~/client/device', //add to observable
      $transform (val) {
        return val === 'ios'
      }
    }
  }
}
*/
