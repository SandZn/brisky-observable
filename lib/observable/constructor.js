'use strict'

exports.define = {
  generateConstructor () {
    return function Observable (val, stamp, parent, key, escape) {
      // add new event (later)
      this.clearContext()
      this._i = null
      this.addToInstances(stamp)
      this.setParent(val, stamp, parent, key)
      if (val !== void 0) {
        this.set(val, stamp, true, escape)
      }
    }
  }
}
