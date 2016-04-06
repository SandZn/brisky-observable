'use strict'
var Observable = require('../')
var test = require('tape')

test('operator $primitive transform using $condition', function (t) {
  t.plan(4)
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
})

test('operator primitive $transform using custom type and $condition', function (t) {
  t.plan(2)
  const reference = new Observable(20)
  const Obs = new Observable({
    properties: {
      $someCase: {
        type: '$transform',
        $condition: {
          val: reference,
          $transform (val) { return val > 10 }
        }
      }
    },
    Child: 'Constructor'
  }).Constructor
  const instance = new Obs({ field: { $someCase: 'hello' } })
  t.equal(instance.field.compute(), 'hello', 'nested $transform outputs "hello"')
  instance.field.once(() => {
    t.equal(
      instance.field.compute(),
      instance.field,
      'setting condition to false fires listener and ignores operator'
    )
  })
  reference.set(5)
})

test('operator object $transform', function (t) {
  t.plan(2)
  const obs = new Observable({
    key: 'obs',
    val: 'value',
    $transform: [
      (val) => val.toUpperCase(),
      (val) => { return { field: val, field2: 2 } }
    ]
  })
  t.deepEqual(obs.compute().keys(), ['field', 'field2'], 'correct fields after object transform')
  t.equal(obs.compute().field.val, 'VALUE', 'use multiple transforms')
})

test.skip('operator object $set using condition', function (t) {
  // missing a million usecases e.g. remove
  // nested nested fields etc etc
  // if we want to be able to create normal object fields then i need to add Child:false as functionality
  // should be easy
  const reference = new Observable(true)
  const obs = new Observable({
    key: 'obs',
    val: 'value',
    anotherfield: true,
    bla: true,
    $set: {
      val: 'something',
      field: 'a field!',
      bla: null, // this is a problem of course but want to support it
      // nested fields in set should be normal object probably
      $condition: reference
    }
  })
  console.log(obs.compute())
  console.log(obs.compute().compute()) // this is ofcourse pretty fucking lame!
  // lets think about this and fix it
  obs.once(() => console.log(obs.compute()))
  reference.set(false)
  t.end()
})

// just finish it so it works for cases
// multiple use cases but most imoportant object is for on element it self
// cache may be moved to observable -- lets see in state -- getting rid of state altogether just make ti subscribe
// using trees
// val is for props
// so in element make sure that compute does not result in the val so we actually get the object
// other option is to pass a value to compute that says dont try to compute nested fields :/ ?
// so by default this is not nessecary .compute.compute // but in some case you can choose .compute('self')
// or something
