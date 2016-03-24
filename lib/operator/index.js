'use strict'
var Observable = require('../observable')
var obs = new Observable({
  type: 'operator',
  properties: {
    _operator: true,
    operator: '_operator'
  },
  bind () {
    let parent = this.parent
    return parent && parent.getBind()
  },
  on: {
    data (data, stamp) {
      var parent = this.parent
      if (parent && parent.emit && parent.val !== null) {
        // get data emitter speed thigns up here as well ;)
        parent.emit('data', data, stamp)
      }
    }
  }
})

module.exports = obs.Constructor
obs.inject(require('./val'))
