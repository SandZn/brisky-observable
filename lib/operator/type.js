'use strict'
var isNumberLike = require('vigour-util/is/numberlike')
var isNumber = require('vigour-util/is/number')
var isUrl = require('vigour-util/is/url')
var isEmail = require('vigour-util/is/email')
// grabs groups of numbers takes out numbers from strings
var number = /(.*?)(-?\d+(\.\d+)?)/

exports.type = '$type'
exports.properties = { range: true }
exports.operator = function (val, stamp, operator, origin) {
  var type = operator.val
  if (operator.range) {
    // make this for bytes and numbers
    // if buffer sets byte range
    let ranges = operator.range
    let min, max
    min = ranges[0]
    max = ranges[1]
    let numberVal = getNumber(val)
    if (numberVal >= min && numberVal <= max) {
      return numberVal
    } else {
      return (Math.abs(numberVal - max) < Math.abs(numberVal - min)) ? max : min
    }
  } else if (type === 'buffer') {
    if (val instanceof Buffer) {
      return val
    } else if (
      typeof val === 'string' ||
      typeof val === 'boolean' ||
      isNumber(val)
    ) {
      if (val === true) {
        val = 1
      }
      return new Buffer(val)
    } else {
      // can also return an empty buffer
      return false
    }
  } else if (type === 'boolean') {
    let check = typeof val
    if (
      val &&
      (
      val === true ||
      check === 'string' ||
      isNumberLike(val) ||
      val instanceof Buffer
      )
    ) {
      return true
    } else {
      return false
    }
  } else if (type === 'url') {
    return isUrl(val) ? val : false
  } else if (type === 'email') {
    return isEmail(val) ? val : false
  } else {
    let parsed = operator.compute(void 0, val, stamp, origin)
    if (parsed === 'string') {
      let type = typeof val
      if (type === parsed) {
        return val
      } else {
        if (val instanceof Buffer) {
          return val.toString('utf8')
        } else if (type === 'object' || val === false) {
          return ''
        }
        return val === void 0 ? '' : val + ''
      }
    } else if (parsed === 'number') {
      return getNumber(val)
    }
  }
}

function toFloat (val) {
  var match = val.match(number)
  return (match && match[2]) || 0
}

function getNumber (val) {
  if (isNumber(val)) {
    return val
  } else if (isNumberLike(val)) {
    return Number(val)
  } else if (typeof val === 'string') {
    return Number(toFloat(val) || 0)
  }
  return 0
}
