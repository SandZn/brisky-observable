'use strict'
var compute = require('vigour-base').prototype.compute

exports.define = {
  compute (previousVal, event, origin) {
    var operators = this.keys('_operators')
    var val = compute.call(this, previousVal, event, origin)
    if (operators) {
      for (let i in operators) {
        let operator = this[operators[i]]
        setContext(operator, this)
        let bind = operator.getBind()
        if (bind) {
          let calc = operator.operator.call(bind, val, event, operator, origin)
          if (calc === null) {
            val = void 0
          } else if (calc !== void 0) {
            val = calc
          }
        }
        // operator.clearContext() // this is unclear try to remove it
      }
    }
    if (this.keyType !== '_operators' && val === void 0) {
      // maybe we want to ignore this
      val = this
    }
    return val
  }
}

function setContext (operator, parent) {
  if (operator._parent !== parent) {
    operator.__c = parent
    operator._cLevel = 1
  } else if (parent.__c) {
    operator.__c = parent.__c
    operator._cLevel = parent._cLevel + 1
  }
}

/*
CACHE MAY WANT IT HERE!
parseValue (val, event, origin) {
  // for now computed allways creates new observables
  // later (today hopefully will do stuff in state to unify this)
  // maybe the lstamp part will jst move into observable -- can use the same walker then for context/lstamp
  // what about state as an observable just adding subscribe to it?
  // may be better?
  // then state is only the tree diffing and subscription and it can just be added to observable
  // good plan?
  // think so yes!

  if (val === void 0) {
    let rdata = getDataOrigin(this)
    if (rdata) {
      val = rdata.parseValue()
    }
  }
  if (val === void 0 || !this._datarender) {
    if (this._originalCache !== void 0) {
      if (this._originalCacheStamp == this._lstamp) { //eslint-disable-line
        return this._originalCache // will be build in called --- cache
      }
    }
  }
  val = _parseValue.call(this, val, event, origin)
  if (val !== void 0 && !this.hasOwnProperty('_originalCache')) {
    this._originalCacheStamp = this._lstamp
    this._originalCache = val
  }
  return val
},
*/
