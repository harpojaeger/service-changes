const train = require('./trains')
import {station} from './stations'
import {reason, problem, preposition} from './reasons'
import {holiday} from './holidays'
import {relativeTime, specificTime, until} from './times'
import {compassDirection} from './directions'
import {incident} from './incidents'

// In many cases, a <reason> and an <until> block are interchangeable. This function lets us generate them dynamically so we don't have to write the same form twice.
const reasonOrUntil = () => Math.floor(Math.random()*2) ? reason() : `until ${until()}`

// Each form is a function that returns a service announcement in text form.
const forms = [
  () => `${train().data.train} trains are not running between ${station()} and ${station()} ${reasonOrUntil()}.`,

  () => `${train().data.train} trains are running on the ${train().data.train} line between ${station()} and ${station()} ${reasonOrUntil()}.`,

  () => `${train().data.train} trains make local stops between ${station()} and ${station()} ${reasonOrUntil()}.`,

  () => `${train().data.train} trains run express from ${station()} to ${station()} ${reasonOrUntil()}.`,

  () => `${train().data.train} trains are rerouted via the ${train().data.train} line from ${station()} to ${station()} ${reasonOrUntil()}.`,

  () => `Beginning ${relativeTime()}, ${train().data.train} trains are rerouted via the ${train().data.train} line from ${station()} to ${station()} ${reason()}.`,

  () => `Starting ${relativeTime()} from ${specificTime()} to ${specificTime()}, ${train().data.train} trains skip ${station()} in both directions ${reason()}.`,

  () => `The ${station()}-bound platform at ${station()} is out of service until ${holiday()}.`,

  () => `${station()}-bound trains skip ${station()} ${preposition()} a train with ${problem()} problems.`,

  () => `${compassDirection({cap: true})}-bound trains skip ${station()} in both directions ${preposition()} a train with ${problem()} problems.`,

  () => `MTA work crews have been dispatched to ${station()} to fix ${problem()} problems. We hope to have regular service restored soon.`,

  () => `${train().data.train} service has resumed following an earlier ${incident()}.`,

  () => `Some ${train().data.train} trains end at ${station()} ${reasonOrUntil()}.`

]

export function form(){
  return forms[Math.floor(Math.random()*forms.length)]()
}
