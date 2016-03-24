'use strict'
module.exports = function id (base, val) {
  if (val && val._base_version) {
    return val.uid()
  } else {
    return (base._id ? (++base._id) : (base._id = 1))
  }
}
