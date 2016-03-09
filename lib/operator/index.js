'use strict'
var Observable = require('../observable')
var obs = new Observable({
  type: 'Operator',
  properties: {
    _operator: true,
    operator: '_operator'
  },
  bind () {
    let parent = this.parent
    return parent && parent.getBind()
  },
  on: {
    data (data, event) {
      var parent = this.parent
      if (parent && parent.emit && parent.__input !== null) {
        parent.emit('data', data, event)
      }
    }
  }
})

module.exports = obs.Constructor
obs.inject(require('./val'))
