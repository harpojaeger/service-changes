import {station} from './stations'
import train from './trains'

// Helper functions to return a random instance of a particular part of speech
export const preposition = () => {
  const prepositions = ['because of', 'due to', 'in light of']
  return prepositions[Math.floor(Math.random()*prepositions.length)]
}
export const conjunction = () => {
  const conjunctions = ['because', 'since']
  return conjunctions[Math.floor(Math.random()*conjunctions.length)]
}

// a train with <problem> problems
const problems = [
  'strange',
  '...honestly, just weird',
  'heretofore-unseen',
  'drinking',
  'gambling',
  'unthinkably complex',
  'frankly inscrutable',
  'singing',
  'dancing',
  'jumping',
  'tooth'
]

export const problem = () => problems[Math.floor(Math.random()*problems.length)]

// Phrases that can be used in a sentence of the form 'J trains are not running between Foo and Bar <reason>'
const reasons = [
  [preposition, 'excessive pigeon activity'],
  [preposition, 'an unfortunate confluence of stoats'],
  [preposition, 'rapidly rising sea levels'],
  [preposition, 'the unbearable lightness of being'],
  [preposition, 'malevolent bears'],
  [preposition, "the Trump administration's racist deportation policies"],
  [preposition, 'the wind in the willows'],
  [preposition, 'a runtime error'],
  [preposition, 'poorly-configured trebuchets'],
  [preposition, 'a stray paper airplane'],
  [preposition, 'a pop-up M.I.A. concert'],
  [preposition, 'logical fallacies'],
  [preposition, 'shoddily-constructed cardboard boxes'],
  [preposition, 'restaurant regret'],
  [preposition, 'a severe shortage of antidepressants'],
  [preposition, 'anxiety'],
  [conjunction, 'they woke up on the wrong side of the bed this morning'],
  ["because that's just the way the cookie crumbles"],
  ["because they're special snowflakes"],
  [preposition, 'neo-conservative politics'],
  ['while our crews remove poison ivy from the third rail'],
  ['in order to avoid asteroids'],
  ['because Vladimir Putin is practicing judo'],
  ['while crews practice the lindy hop'],
  [preposition, "Cardi B's incredible new album"],
  [conjunction, 'the signaling system is made of cheese'],
  [`because a convention of dentists has taken over ${station()} station`],
  [`because the ${train().data.train} train is busy catching up on West Wing season ${Math.floor(Math.random()*100)}`],
  [preposition, 'a track fire started by the Underground Dwellers'],
  [preposition, 'a tunnel obstruction made of spray cheese'],
  [conjunction, `the USA gymnastics team is swinging from the roof supports at ${station()}`],
  [preposition, 'a mile-long web of Silly String'],
  [preposition, `the Sylvia Plath symposium, which requires that all passengers be rerouted to ${station()}`],
  [preposition, `the pending, and ugly, divorce of the ${train().data.train} and the ${train().data.train}`],
  [preposition, 'the tangled web we weave, when first we practice to deceive'],
  [preposition, 'a maple syrup spillage'],
  [conjunction, 'Andrew Cuomo has demanded a refund of 5 dollars and 65 cents'],
  [conjunction, `a ${train().data.train} train was founding sobbing between ${station()} and ${station()}, and cannot be consoled`],
  [conjunction, 'there is no intelligent life on this planet'],
  [conjunction, `the Revival tent has been pitched in ${station()}`],
  [`because there’s one more horcrux than we knew - and it’s somewhere under ${station()}`],
  [preposition, 'the Boston Molasses Disaster'],
  [conjunction, 'someone saw something and said something'],
  ['in search of the best falafel in the city']
]

export function reason() {
  const formula = [...reasons[Math.floor(Math.random()*reasons.length)]]
  for (let i = 0; i < formula.length; i++) {
    if (typeof formula[i] === 'function') formula[i] = formula[i]()
  }
  return formula.join(' ')
}
