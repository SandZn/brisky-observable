'use strict'
var Observable = require('../observable')
Observable.prototype.inject(require('./compute'), false)

module.exports = new Observable({
  type: 'operator',
  properties: { operator: true },
  keyType: 'operator',
  define: { isOperator: true },
  instances: false,

  // // this needs to be replaced!!!!!
  // bind () {
  //   const parent = this.cParent()
  //   return parent && parent.getBind()
  // },
  // // replace!!!

  on: {
    data (val, stamp) {
      var parent = this.parent
      if (parent && parent.emit && parent.val !== null) {
        let on = parent._emitters
        let emitter = on.data || on._data
        if (emitter) {
          emitter.emit(parent, val, stamp)
        }
      }
    }
  }
}, false).Constructor
