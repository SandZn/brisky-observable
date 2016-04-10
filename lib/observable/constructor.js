'use strict'

exports.define = {
  generateConstructor () {
    return function Observable (val, stamp, parent, key, escape) {
      this._Constructor = null
      if (this._i === false) {
        // console.log('--- dont!', this)
        this._i = null
      } else {
        this._i = null
        if (this._isChild) {
          this._isChild = null
        }
        this.clearContext()
        this.addToInstances(stamp)
      }
      this.setParent(val, stamp, parent, key)
      if (val !== void 0) {
        this.set(val, stamp, true, escape, true)
      }
    }
  }
}
