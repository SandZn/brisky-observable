'use strict'
var Base = require('vigour-base')
var vstamp = require('vigour-stamp')
var _remove = Base.prototype.remove

// optmization strategies
// -- call data directly -- think about property

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
          // this.emit('remove', null, stamp)
          this.emit('data', null, stamp)
        }
      }
      if (this._parent && this._parent instanceof Observable) {
        let parent = this.parent
        // parent.emit('property', this.key, stamp)
        if (!fromRemove) {
          parent.emit('data', void 0, stamp)
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
          // _this.emit('remove', null, stamp)
          _this.emit('data', null, stamp)
          vstamp.close(stamp)
          _this.removeFromInstances(stamp)
          return _remove.call(_this, false, nocontext, noparent)
        } else {
          vstamp.on(stamp, () => {
            this.removeFromInstances(stamp)
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
