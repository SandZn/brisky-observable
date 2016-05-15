'use strict'
var Observable = require('./observable')
Observable.prototype.inject(require('./operator'), false)
module.exports = Observable
