'use strict'
var Observable = require('../observable')
Observable.prototype.inject(require('./compute'), false)

module.exports = new Observable({
  type: 'operator',
  properties: { operator: true },
  keyType: '_operators',
  instances: false,
  bind () {
    var parent = this.cParent()
    return parent && parent.getBind()
  },
  on: {
    data (val, stamp) {
      var parent = this.parent
      if (parent && parent.emit && parent.val !== null) {
        let on = parent.__on
        let emitter = on.data || on._data
        if (emitter) {
          emitter.emit(parent, val, stamp)
        }
      }
    }
  }
}, false).Constructor
