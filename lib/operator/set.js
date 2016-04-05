'use strict'
exports.type = '$set'
exports.operator = function (val, stamp, operator, origin) {
  // fix it good
  // make weird merge type of thing here
  // what about mimmicing 'normal' set behaviour as much as possible?
  var set = operator.compute(val, stamp, origin)
  if (set !== void 0 && set !== null) {
    let keys = operator.keys()
    if (keys) {
      if (typeof set === 'object' && set._operatorResult) {
        // console.log('got some _operatorResult')
      } else {
        set = new this.Constructor(set, false)
        set._operatorResult = true
      }
      for (var i in keys) {
        // should not make references here just normal object stuff
        // also need nested fields etc
        // need to support null
        // so no child constructor for $set ???
        set.setKey(keys[i], operator[keys[i]].compute())
      }
    }
  }
  return set
}
