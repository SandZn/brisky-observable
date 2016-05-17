'use strict'
const vstamp = require('vigour-stamp')
const Base = require('vigour-base')
const isObj = require('vigour-util/is/plainobj')
const isNumberLike = require('vigour-util/is/numberlike')
const ListensOn = require('./listens')
const ListensOnattach = ListensOn.ListensOnattach
const ListensOnBase = ListensOn.ListensOnBase
const id = require('./id')

// @todo: split this file up -- can be greatly improved
// @todo: its dirty, its too much code, all slow, unoptmized, double

exports.define = {
  on (val, key, unique, stamp) {
    // start at zero faster looping!
    if (!key) { key = id(this, val) }
    if (typeof val === 'function') {
      add(this, 'fn', val, key, unique, stamp)
    } else if (val instanceof Base) {
      if (!add(this, 'base', val, key, unique || true, stamp)) {
        if (!val.listensOnBase) {
          val.setKeyInternal(
            'listensOnBase',
            new ListensOnBase(void 0, void 0, val),
            false
          )
        } else if (!val.hasOwnProperty('listensOnBase')) {
          val.setKeyInternal(
            'listensOnBase',
            new val.listensOnBase.Constructor(void 0, void 0, val),
            false
          )
        }
        let listensOnBase = val.listensOnBase
        listensOnBase[id(listensOnBase)] = this
      }
    } else if (val instanceof Array) {
      if (!add(this, 'attach', val, key, unique, stamp)) {
        if (val.length > 2) {
          val[2] = val.slice(1)
          val = val.slice(0, 2)
        }
        let passedOnBased = val[1]
        if (passedOnBased instanceof Base) {
          if (!passedOnBased.listensOnAttach) {
            passedOnBased
              .setKeyInternal(
                'listensOnAttach',
                new ListensOnattach(void 0, void 0, passedOnBased),
                false
              )
          } else if (!passedOnBased.hasOwnProperty('listensOnAttach')) {
            passedOnBased
              .setKeyInternal(
                'listensOnAttach',
                new passedOnBased.listensOnAttach.Constructor(void 0, void 0, passedOnBased),
                false
              )
          }
          let listensOnAttach = passedOnBased.listensOnAttach
          listensOnAttach[id(listensOnAttach)] = this
        }
      }
    }
  },
  set (val, stamp, nocontext) {
    if (!val) {
      return this
    } else if (isObj(val) && !(val instanceof Array)) {
      set(this, val, stamp, nocontext)
    } else {
      this.on(val, 'val', void 0, stamp, void 0, nocontext)
    }
    return this
  }
}

function set (emitter, val, stamp, nocontext) {
  let props = emitter._properties
  for (let key in val) {
    if (props[key]) {
      props[key].call(emitter, val[key], stamp, nocontext, key)
    } else {
      if (!emitter._id && isNumberLike(key)) {
        // @todo: is this really nessecary? -- maybe better to check in the id generator?
        emitter._id = Number(key)
      }
      if (val[key] === null) {
        emitter.off(key)
      } else {
        emitter.on(val[key], key, void 0, stamp, void 0, nocontext)
      }
    }
  }
}

function parseUnique (emitterType, val, emitter, key, type, unique) {
  var isFn = typeof unique === 'function'
  var stop
  if (isFn) {
    emitterType.each(function (listener) {
      if (!unique.call(emitter, listener, val)) {
        return (stop = true)
      }
    })
  } else {
    if (type === 'attach' && unique === true) {
      // way to slow of course... needs to use uids for attaches
      emitterType.each((listener) => {
        if (listener[1] === val[1]) {
          return (stop = true)
        }
      })
    } if (type === 'base' && typeof key !== 'string') {
      stop = emitterType[key]
    } else {
      emitterType.each((listener) => {
        if (listener === val) {
          return (stop = true)
        }
      })
    }
  }
  if (stop) {
    return true
  }
}

function resolve (emitter, type, key) {
  if (!emitter.hasOwnProperty(type)) {
    emitter.setKey(type, {}, false)
  }
  if (emitter[type][key]) {
    emitter[type].removeProperty(emitter[type][key], key, true)
  }
}

function addInternal (emitter, type, key, val) {
  if (emitter[type]) {
    emitter[type][key] = val
    emitter[type]._keys = null
  }
}

function add (emitter, type, val, key, unique, stamp) {
  const emitterType = emitter[type]
  if (!emitterType) {
    if (stamp) {
      vstamp.on(stamp, () => {
        if (!emitter[type]) {
          emitter.setKey(type, void 0, false)
        } else {
          resolve(emitter, type, key)
        }
        addInternal(emitter, type, key, val)
      })
      return
    } else {
      emitter.setKey(type, void 0, false)
      addInternal(emitter, type, key, val)
      return
    }
  } else if (unique) {
    if (parseUnique(emitterType, val, emitter, key, type, unique)) {
      return true
    }
  }
  if (stamp) {
    resolve(emitter, type, key)
    vstamp.on(stamp, () => addInternal(emitter, type, key, val))
  } else {
    resolve(emitter, type, key)
    addInternal(emitter, type, key, val)
  }
}
