'use strict'
var vstamp = require('vigour-stamp')
var c = vstamp.create
vstamp.create = function () {
  console.log(new Error('--------').stack)
  return c.apply(this, arguments)
}
var Observable = require('../')
var test = require('tape')

test('operator', function (t) {
  console.log('STARTING STAMP:', vstamp.cnt, 'should be 0')
  var someCondition = false
  var obs = new Observable({
    key: 'obs',
    val: 'value',
    $transform: {
      val (val) {
        console.log('transform --->')
        return val.toUpperCase()
      },
      $add () {
        console.log('add --->')
        return someCondition
      }
    }
  })

  // console.log('?', obs.$transform._mapProperty)
  // changing original does not clear the properties of instances thats of course very wrong
  // this measn we need to track instnces and we dont want that for sure!

  // console.log()
  console.log('#START OPERATORS -----> _operators in obs.$transform', obs.$transform.keys('_operators'))
  console.log(obs.compute())
  // t.equal(obs.compute(), 'VALUE', 'transform (string) input value')

  // t.equal(obs.compute(), 'VALUE', 'transform (string) input value')

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
