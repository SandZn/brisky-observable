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
        console.log('transform --->')
        return val.toUpperCase()
      },
      $condition () {
        return someCondition
      }
    }
  })

  // console.log('?', obs.$transform._mapProperty)
  // changing original does not clear the properties of instances thats of course very wrong
  // this measn we need to track instnces and we dont want that for sure!

  // console.log()
  console.log('#START OPERATORS -----> _operators in obs.$transform', obs.$transform.keys('_operators'))
  console.log('RESULT!', obs.compute())

  t.equal(obs.compute(), 'value', 'does not transform when condition is falsy')
  someCondition = true
  t.equal(obs.compute(), 'VALUE', 'transforms to uppercase when condition is truthy')

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
