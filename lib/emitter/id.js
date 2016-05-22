'use strict'
module.exports = function id (base, val) {
  if (val && val.isBase) {
    return val.uid()
  } else {
    return (base._id ? (++base._id) : (base._id = 1))
  }
}
