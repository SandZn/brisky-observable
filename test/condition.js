'use strict'
var Observable = require('../')
var test = require('tape')

test('condition', function (t) {
  t.plan(1)
  var obs = new Observable({
    share: {
      val: false,
      platform: {},
      on: {
        data: {
          condition (data, done, next, originalData) {
            t.equal(data, true)
            this.platform.emit('share', {data, done})
          },
          val () {}
        }
      }
    }
  })
  obs.share.val = true
})
