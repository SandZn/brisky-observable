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
  Child: 'Constructor'
}).Constructor

Observable.prototype.set({
  components: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype // emitters will go away soon
  }
})
