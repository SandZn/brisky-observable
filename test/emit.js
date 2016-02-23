console.log('lullllz')
var Observable = require('../')
var a = new Observable('a')
a.key = 'hello'
a.on('data', function () {
  console.error('yo yo yo', this.path)
})
console.log(a.val)
a.val = 'xxxx'