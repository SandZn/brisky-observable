'use strict'
var Observable = require('./observable')
Observable.prototype.inject(require('./operator'))
module.exports = Observable
