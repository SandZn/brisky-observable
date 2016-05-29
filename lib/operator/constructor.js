'use strict'
const Observable = require('../observable')

module.exports = new Observable({
  type: 'operator',
  keyType: 'operator',
  properties: { operator: true },
  define: { isOperator: true },
  instances: false,
  on: {
    data: {
      updateParent (val, stamp) {
        const parent = this.parent
        if (parent && parent.emit && parent.val !== null) {
          let on = parent._emitters
          let emitter = on.data || on._data
          if (emitter) {
            emitter.emit(parent, val, stamp)
          }
        }
      }
    }
  }
}, false).Constructor
