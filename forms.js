const train = require('./trains')
const station = require('./stations')
const reason = require('./reasons')

// Each form is a function that returns a service announcement object with html and text properties.
const forms = [
  () => {
    // Q trains are not running between Foo and Bar because of <reason>
    return `${train().data.train} trains are not running between ${station()} and ${station()} because of ${reason()}.`
  },
  () => {
    // X trains are running on the P line between Foo and Bar because of <reason>
    return `${train().data.train} trains are running on the ${train().data.train} line between ${station()} and ${station()} because of ${reason()}.`
  },
  () => {
    // X trains make local stops between Foo and Bar because of <reason>
    return `${train().data.train} trains make local stops between ${station()} and ${station()} because of ${reason()}.`
  }
]

function form(){
  return forms[Math.floor(Math.random()*forms.length)]()
}

module.exports = form
