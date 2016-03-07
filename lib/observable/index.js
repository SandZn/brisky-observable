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
    require('./subscribe')
  ],
  type: 'observable',
  ChildConstructor: 'Constructor'
}).Constructor

Observable.prototype.set({
  components: {
    base: Base.prototype,
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype
  }
})
