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
  on: {},
  type: 'observable',
  Child: 'Constructor',
  define: { isObservable: { value: true } }
}, false).Constructor

Observable.prototype.set({
  types: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype // emitters will go away soon
  }
}, false)
