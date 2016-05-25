'use strict'
var Base = require('vigour-base')
var Observable = module.exports = new Base({
  inject: [
    require('./constructor'),
    require('./on'),
    require('./emit'),
    require('./off'),
    require('./remove'),
    require('./set'),
    require('./instances')
  ],
  type: 'observable',
  define: { isObservable: { value: true } },
  child: 'Constructor'
}, false).Constructor

Observable.prototype.set({
  types: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype
  }
}, false)
