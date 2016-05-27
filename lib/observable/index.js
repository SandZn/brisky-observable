'use strict'
var Base = require('vigour-base')
var Observable = module.exports = new Base({
  inject: [
    require('./on'),
    require('./emit'),
    require('./off'),
    require('./remove'),
    require('./set')
  ],
  type: 'observable',
  define: { isObservable: true },
  child: 'Constructor'
}, false).Constructor

Observable.prototype.set({
  types: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype
  }
}, false)
