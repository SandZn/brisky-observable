'use strict'
var Base = require('vigour-base')
var vstamp = require('vigour-stamp')
var _remove = Base.prototype.remove

module.exports = function (observable) {
  var Observable = observable.Constructor
  observable.define({
    contextRemove (key, stamp) {
      const target = this[key]
      if (stamp) {
        if (target.emitRemove) { target.emitRemove(stamp) }
        vstamp.on(stamp, () => {
          this.removeKey(key, target)
          this[key] = null
        })
      } else {
        this.removeKey(key, target)
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
          let on = this._emitters
          let emitter = on._data || on.data
          let remitter = on._removeEmitter || on.removeEmitter
          if (emitter) { emitter.emit(this, null, stamp) }
          if (remitter) { remitter.emit(this, null, stamp) }
        }
      }
      if (this._parent && this._parent instanceof Observable) {
        let parent = this.parent
        // parent.emit('property', this.key, stamp)
        if (!fromRemove) {
          // add information to the parent emitter here
          let on = parent._emitters
          let emitter = on._data || on.data
          if (emitter) { emitter.emit(parent, void 0, stamp) }
        }
      }
      this.each(
        function (target, key) {
          if ('emitRemove' in target) {
            target.emitRemove(stamp, void 0, true)
          }
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
        if (created) {
          let on = this._emitters
          let emitter = on._data || on.data
          let remitter = on._removeEmitter || on.removeEmitter
          if (emitter) { emitter.emit(this, null, stamp) }
          if (remitter) { remitter.emit(this, null, stamp) }
          _this.emitRemove(stamp, created, void 0)
          vstamp.on(stamp, () => {
            _remove.call(_this, false, nocontext, noparent)
          })
          vstamp.close(stamp)
        } else {
          _this.emitRemove(stamp, created, void 0)
          vstamp.on(stamp, () => {
            _remove.call(_this, false, nocontext, noparent)
          })
        }
        return _this
      } else {
        return _remove.call(_this, false, nocontext, noparent)
      }
    }
  })
}
