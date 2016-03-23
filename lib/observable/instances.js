'use strict'
exports.define = {
  addToInstances (event) {
    var proto = Object.getPrototypeOf(this)
    if (!proto._i) { proto._i = [] }
    proto._i.push(this)
  },
  removeFromInstances (event) {
    var proto = Object.getPrototypeOf(this)
    var instances = proto._i
    // proto instances
    if (instances) {
      let length = instances.length
      for (let i = 0; i < length; i++) {
        if (instances[i] === this) {
          // removes itself from instances
          instances.splice(i, 1)
          break
        }
      }
    }
    // own instances
    instances = this._i
    if (instances) {
      let length = instances.length
      for (let i = 0; i < length; i++) {
        instances[i].remove(false)
        i--
        length--
      }
    }
  }
}
