'use strict'
exports.properties = {
  instances (val) {
    this._i = val
  }
}

// setting _i to false creates special behaviour
// will not track instances / child for the first layer of inheritance
// e.g. a = new Ons (no instances on obs)
// b = new a.Const (instances on a)
exports.instances = false

// needs an overwrite for properties to remap inherited props
exports.define = {
  addToInstances () {
    var proto = Object.getPrototypeOf(this)
    if (!proto._i) { proto._i = [] }
    proto._i.push(this)
  },
  removeFromInstances () {
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
