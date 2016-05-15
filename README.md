# vigour-observable
<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/observable.svg?branch=master)](https://travis-ci.org/vigour-io/observable)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/vigour-observable.svg)](https://badge.fury.io/js/vigour-observable)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/observable/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/observable?branch=master)

<!-- VDOC END -->

Simple, extendable observables - does not require knowledge of flatmaps, reduce or event streams, inspired by [rx-js](http://reactivex.io/) and modelled as [observ-struct](https://www.npmjs.com/package/observ-struct).

Biggest difference adds unqiue change stamps see [vigour-stamp](https://github.com/vigour-io/stamp) for more information

Inherits from [vigour-base](https://github.com/vigour-io/observable)

####operators and set
```javascript
var Observable = require('vigour-observable')
var name = new Observable({
  val: 'a name',
  $transform (val) {
    return val.toUpperCase()
  }
})

var person = new Observable({ name: 'a name' })

person.name.on(() => {
  // logs "A NAME" when set to the reference
  console.log('hey a name!', this.compute())
})

// create an observing reference from person.name to name
person.name.set(name)

// fires the listener on person.name, logs "JAMES"
name.set('james')
```

####on and off
```javascript
var Observable = require('vigour-observable')
var fruits = new Observable()

fruits.on((data, stamp) => {
  // stamp is a unique stamp for each change see vigour-stamp
  // data is the current set obj { banana: 1, kiwi: 1 } in this case
  console.log('fruits!', data, stamp)
})

// this will fire the listener on fruits
fruits.set({ banana: 1 kiwi: 1 })

fruits.banana.once(() => {
  console.log('banana!')
})

// fires banana, does not fire for fruits (by default listeners do not fire for nested fields)
fruits.banana.set(2)

fruits.set({
  // this is the object notation for on listeners - usefull for inheritance
  on: {
    data () {
      // on.data is the default emitter of on
      console.log('any fruit?')
    }
  }
})

// remove the kiwi and fires "any fruit?" and "fruits"
fruits.kiwi.set(null)

// you can make as many emitter types as you want
// will add a listener to the emitter "purchase" with an identifier "history"
fruits.on('purchase', (fruit) => {
  console.log('a purchase!', data)
  this.set({ purchaseHistory: { [fruit]: 1 } })
}, 'history')

fruits.emit('pruchase', 'kiwi')

// remove the listener on purchase with id history
fruits.off('purchase', 'history')

// removes all listeners on purchase
fruits.off('purchase')

// adds the same listener using the object notation
fruits.set({
  on: {
    purchase: {
      history (fruit) {
        this.set({ purchaseHistory: { [fruit]: 1 } })
      }
    }
  }
})
```
