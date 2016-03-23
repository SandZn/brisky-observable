'use strict'
// this will probably go
var Emitter = require('./index.js')
var emitInternal = Emitter.prototype.emitInternal
module.exports = new Emitter({
  define: {
    emitInternal (data, event, bind) {
      var propData = this.getData(event, bind)
      if (!propData) {
        propData = { added: [], removed: [] }
      }
      if (data) {
        if (bind[data] && bind[data].val !== null) {
          propData.added.push(data)
        } else {
          propData.removed.push(data)
        }
      }
      return emitInternal.call(this, propData, event, bind)
    }
  }
}).Constructor
