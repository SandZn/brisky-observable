'use strict'
const isNumberLike = require('vigour-util/is/numberlike')
const isNumber = require('vigour-util/is/number')
const isUrl = require('vigour-util/is/url')
const isEmail = require('vigour-util/is/email')
// grabs groups of numbers takes out numbers from strings
const number = /(.*?)(-?\d+(\.\d+)?)/

exports.type = '$type'
exports.properties = { range: true }

exports.operator = function (val, start, stamp, operator) {
  var result
  const type = operator.compute.call(this, operator.val, val, start, stamp, operator)
  if (operator.range) {
    let ranges = operator.range
    let min, max
    min = ranges[0]
    max = ranges[1]
    let numberVal = getNumber(val)
    if (numberVal >= min && numberVal <= max) {
      result = numberVal
    } else {
      result = (Math.abs(numberVal - max) < Math.abs(numberVal - min)) ? max : min
    }
  } else if (type === 'boolean') {
    const valType = typeof val
    if (
      val &&
      (
      val === true ||
      valType === 'string' ||
      isNumberLike(val)
      )
    ) {
      result = true
    } else {
      result = false
    }
  } else if (type === 'url') {
    result = isUrl(val) ? val : false
  } else if (type === 'email') {
    result = isEmail(val) ? val : false
  } else if (type === 'string') {
    const valType = typeof val
    if (type === valType) {
      result = val
    } else if (valType === 'object' || val === false || val === void 0) {
      result = ''
    } else {
      result = val + ''
    }
  } else if (type === 'number') {
    result = getNumber(val)
  }
  return result
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
