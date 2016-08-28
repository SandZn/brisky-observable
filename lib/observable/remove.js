'use strict'
const vstamp = require('vigour-stamp')

exports.define = {
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
        const on = this._emitters
        const emitter = on._data || on.data
        const remitter = on._removeEmitter || on.removeEmitter
        if (emitter) { emitter.emit(this, null, stamp) }
        if (remitter) { remitter.emit(this, null, stamp) }
      }
    }
    if (this._parent && this._parent.isObservable) {
      let parent = this.parent
      if (!fromRemove) {
        const on = parent._emitters
        if (on) {
          const emitter = on._data || on.data
          if (emitter) { emitter.emit(parent, void 0, stamp) }
        }
      }
    }
    this.each(function (target, key) {
      if (target.emitRemove) { target.emitRemove(stamp, void 0, true) }
    })
  },
  extend: {
    remove (remove, stamp, nocontext, noparent) {
      var created
      var target = this
      if (target.__c) {
        target = target.resolveContext({}, stamp, this.__c)
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
          target.emitRemove(stamp, created, void 0)
          if (emitter) { emitter.emit(this, null, stamp) }
          if (remitter) { remitter.emit(this, null, stamp) }
          vstamp.on(stamp, () => {
            remove.call(target, false, nocontext, noparent)
          })
          vstamp.close(stamp)
        } else {
          target.emitRemove(stamp, created, void 0)
          vstamp.on(stamp, () => {
            remove.call(target, false, nocontext, noparent)
          })
        }
        return target
      } else {
        return remove.call(target, false, nocontext, noparent)
      }
    }
  }
}
