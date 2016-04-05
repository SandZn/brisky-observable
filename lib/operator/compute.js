'use strict'
var compute = require('vigour-base').prototype.compute

exports.define = {
  compute (previousVal, stamp, origin) {
    var operators = this.keys('_operators')
    var val = compute.call(this, previousVal, stamp, origin)
    if (operators && !this._operatorResult) {
      for (let i in operators) {
        let operator = this[operators[i]]
        // will require some perf
        let origc = operator.__c
        let l
        if (origc) { l = operator._cLevel }
        setContext(operator, this)
        let bind = operator.getBind()
        if (bind) {
          let calc = operator.operator.call(bind, val, stamp, operator, origin)
          // will cost speed check if its rly nessecary
          if (origc) {
            operator.__c = origc
            operator._cLevel = l
          }
          if (calc === null) {
            val = void 0
          } else if (calc !== void 0) {
            val = calc
          }
        }
      }
    }

    if (this.keyType !== '_operators' && val === void 0) {
      // maybe we want to ignore this -- extra speed impact
      // really do not like it
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
