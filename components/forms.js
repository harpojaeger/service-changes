const train = require('./trains')
import {station} from './stations'
import {reason, problem, preposition} from './reasons'
import {holiday} from './holidays'
import {relativeTime, specificTime, until} from './times'
import {compassDirection} from './directions'

// In many cases, a <reason> and an <until> block are interchangeable. This function lets us generate them dynamically so we don't have to write the same form twice.
const reasonOrUntil = () => Math.floor(Math.random()*2) ? reason() : `until ${until()}`

// Each form is a function that returns a service announcement in text form.
const forms = [
  // Q trains are not running between Foo and Bar <reason or until>
  () => `${train().data.train} trains are not running between ${station()} and ${station()} ${reasonOrUntil()}.`,

  // X trains are running on the P line between Foo and Bar <reason or until>
  () => `${train().data.train} trains are running on the ${train().data.train} line between ${station()} and ${station()} ${reasonOrUntil()}.`,

  // X trains make local stops between Foo and Bar <reason or until>
  () => `${train().data.train} trains make local stops between ${station()} and ${station()} ${reasonOrUntil()}.`,

  // // X trains run express from Foo to Bar <reason or until>
  () => `${train().data.train} trains run express from ${station()} to ${station()} ${reasonOrUntil()}.`,

  // X trains are rerouted via the Y line between Foo and Bar <reason or until>
  () => `${train().data.train} trains are rerouted via the ${train().data.train} line from ${station()} to ${station()} ${reasonOrUntil()}.`,

  // Beginning <relative time>, X trains are rerouted via the Y line between Foo and Bar <reason>
  () => `Beginning ${relativeTime()}, ${train().data.train} trains are rerouted via the ${train().data.train} line from ${station()} to ${station()} ${reason()}.`,

  // Starting <relative time> from <specific time> to <specific time>, X trains skip <station> in both directions <reason>
  () => `Starting ${relativeTime()} from ${specificTime()} to ${specificTime()}, ${train().data.train} trains skip ${station()} in both directions ${reason()}.`,

  // The <station>-bound platform at <station> is out of service until next <holiday>
  () => `The ${station()}-bound platform at ${station()} is out of service until ${holiday()}.`,

  // <station>-bound trains skip <station> <preposition> a train with <problem> problems.
  () => `${station()}-bound trains skip ${station()} ${preposition()} a train with ${problem()} problems.`,

  // <compass direction>-bound trains skip <station> in both directions <preposition> a train with <problem> problems.
  () => `${compassDirection({cap: true})}-bound trains skip ${station()} in both directions ${preposition()} a train with ${problem()} problems.`,

  /* Future forms to implement:

  Our crews are on the scene working to fix the switch problems as quickly as possible. We hope to have regular service restored soon.

  <train> service has resumed following an earlier <incident>.

  <train>s are running with delays <preposition> a <investigation> at <station>
  */
]

export function form(){
  return forms[Math.floor(Math.random()*forms.length)]()
}
