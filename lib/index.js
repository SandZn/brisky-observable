'use strict'
const Observable = require('./observable')
Observable.prototype.inject(require('./operator'), false)
module.exports = Observable
