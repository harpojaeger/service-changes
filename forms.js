const train = require('./trains')
const station = require('./stations')
const reason = require('./reasons')

// Each form is a function that returns a service announcement object with html and text properties.
const forms = [
  function(){
    // Q trains are not running between Foo and Bar because of <reason>
    let train = bullet()
    let startStation = station()
    let endStation = station()
    let reason = reason()
    return train
  }
]
