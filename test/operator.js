'use strict'
// var vstamp = require('vigour-stamp')

var Observable = require('../')
var test = require('tape')

test('operator', function (t) {
  var someCondition = false
  var obs = new Observable({
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
