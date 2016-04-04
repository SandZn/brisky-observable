'use strict'
var Observable = require('../observable')
var obs = new Observable({
  type: 'operator',
  properties: { operator: true },
  define: { _keyType: { value: '_operators' } },
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
obs.inject(require('./compute'))
