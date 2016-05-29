'use strict'
var Base = require('vigour-base')
var Observable = module.exports = new Base({
  type: 'observable',
  inject: [
    require('./on'),
    require('./emit'),
    require('./off'),
    require('./remove'),
    require('./set')
  ],
  define: {
    isObservable: true,
    filter (key) {
      // dont rly need this.. just filter in the each in remove emitter
      // also need key[0] !== '$'
      if (
        key !== 'emitters' &&
        key !== 'listensOnAttach' &&
        key !== 'listensOnBase' &&
        key[0] !== '$'
      ) {
        return true
      }
    }
  },
  instances: false,
  child: 'Constructor'
}, false).Constructor

Observable.prototype.set({
  types: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype
  }
}, false)
