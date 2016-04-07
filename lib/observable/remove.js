'use strict'
var Base = require('vigour-base')
var vstamp = require('vigour-stamp')
var _remove = Base.prototype.remove

module.exports = function (observable) {
  var Observable = observable.Constructor
  observable.define({
    contextRemove (key, stamp) {
      if (stamp) {
        this[key].emitRemove(stamp)
        vstamp.on(stamp, () => { this[key] = null })
      } else {
        this[key] = null
      }
      return this
    },
    emitRemove (stamp, created, fromRemove) {
      if (this.val === null) {
        return
      }
      if (!this.__c) { this.val = null }
      if (stamp) {
        if (!created) {
          let on = this.__on
          let emitter = on._data || on.data
          let remitter = on._removeEmitter || on.removeEmitter
          if (emitter) { emitter.emit(this, stamp, null) }
          if (remitter) { remitter.emit(this, stamp, null) }
        }
      }
      if (this._parent && this._parent instanceof Observable) {
        let parent = this.parent
        // parent.emit('property', this.key, stamp)
        if (!fromRemove) {
          // add information to the parent emitter here
          let on = parent.__on
          let emitter = on._data || on.data
          if (emitter) { emitter.emit(parent, stamp, void 0) }
        }
      }
      this.each(
        function (property) {
          property.emitRemove(stamp, void 0, true)
        },
        function (property) {
          return (property instanceof Observable)
        }
      )
    },
    remove (stamp, nocontext, noparent) {
      var created
      var _this = this
      if (_this.__c) {
        _this = _this.resolveContext({}, stamp, this.__c)
        if (!_this) {
          throw new Error('resolve in remove did not return a _this WRONG!')
        }
      }
      if (stamp === void 0) {
        stamp = vstamp.create()
        created = true
      }
      if (stamp) {
        _this.emitRemove(stamp, created, void 0)
        if (created) {
          let on = this.__on
          let emitter = on._data || on.data
          let remitter = on._removeEmitter || on.removeEmitter
          if (emitter) { emitter.emit(this, stamp, null) }
          if (remitter) { remitter.emit(this, stamp, null) }
          vstamp.close(stamp)
          _this.removeFromInstances(stamp)
          return _remove.call(_this, false, nocontext, noparent)
        } else {
          vstamp.on(stamp, () => {
            _this.removeFromInstances(stamp)
            _remove.call(_this, false, nocontext, noparent)
          })
          return _this
        }
      } else {
        _this.removeFromInstances(stamp)
        return _remove.call(_this, false, nocontext, noparent)
      }
    }
  })
}
