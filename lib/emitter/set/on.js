'use strict'
const vstamp = require('vigour-stamp')
const listens = require('../listens')
const ListensOnattach = listens.Attach
const ListensOnBase = listens.Base
const id = require('../id')

// for off as well
function hasKeyInOther (target, type, key) {
  // const keys = target.keys()
  // if (keys.length > 1 || keys.length && !target[type]) {
  //   target.each((p, pkey) => {
  //     if (pkey !== type) {
  //       if (p[key]) {
  //         // gogin to make this kind of stuff extremely simple
  //         p.removeProperty(key)
  //         // target.off(pkey, key)
  //         return true // cannot have in others (wouldve been removed)
  //       }
  //     }
  //   })
  // }
}

exports.define = {
  on (val, key, unique, stamp) {
    var hasKey
    if (!key) {
      key = id(this, val)
    } else {
      hasKey = true
    }
    if (typeof val === 'function') {
      add(this, 'fn', val, key, unique, stamp)
      if (hasKey) { hasKeyInOther(this, 'fn', key) }
    } else if (typeof val === 'object' && val.isBase) {
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
        const listensOnBase = val.listensOnBase
        const key = id(listensOnBase)
        listensOnBase[key] = this
        listensOnBase.addKey(key, this)
        if (hasKey) { hasKeyInOther(this, 'base', key) }
      }
    } else if (val instanceof Array) {
      if (!add(this, 'attach', val, key, unique, stamp)) {
        if (val.length > 2) {
          val[2] = val.slice(1)
          val = val.slice(0, 2)
        }
        let passedOnBased = val[1]
        if (typeof val === 'object' && val.isBase) {
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
          const listensOnAttach = passedOnBased.listensOnAttach
          const key = id(listensOnAttach)
          listensOnAttach[key] = this
          listensOnAttach.addKey(key, this)
        }
        if (hasKey) {
          hasKeyInOther(this, 'attach', key)
        }
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
  const listener = emitter[type][key]
  if (listener) {
    emitter[type].removeProperty(listener, key, true)
  }
}

function addInternal (emitter, type, key, val) {
  const storage = emitter[type]
  if (storage) {
    storage[key] = val
    storage.addKey(key, val)
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
