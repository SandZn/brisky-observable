'use strict'
var Base = require('vigour-base')
console.log('#CREATE OBS')
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
  Child: 'Constructor'
}, false).Constructor

Observable.prototype.set({
  components: {
    observable: module.exports.prototype,
    emitter: require('../emitter').prototype // emitters will go away soon
  }
}, false)
