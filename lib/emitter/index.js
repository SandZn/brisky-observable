'use strict'
const Base = require('vigour-base')
/**
 * @namespace Emitter
 * @class
 * @augments base
 * @param {*} val
 *  difference with base -- sets listeners for each key
 *  if there is a function will set a listener on fn val
 * @return {base}
 */
module.exports = new Base({
  inject: [
    require('./storage'),
    require('./off'),
    require('./set'),
    require('./once'),
    require('./emit')
  ],
  define: { isEmitter: true },
  noReference: true
}).Constructor
