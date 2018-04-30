// Helper functions to return a random instance of a particular part of speech
export const preposition = () => {
  const prepositions = ['because of', 'due to']
  return prepositions[Math.floor(Math.random()*prepositions.length)]
}
export const conjunction = () => {
  const conjunctions = ['because', 'since']
  return conjunctions[Math.floor(Math.random()*conjunctions.length)]
}

// a train with <problem> problems
const problems = [
  'mechanical',
  'strange',
  '...honestly, just weird',
  'heretofore-unseen',
  'drinking',
  'gambling',
  'unthinkably complex',
  'frankly inscrutable',
  'singing'
]

export const problem = () => problems[Math.floor(Math.random()*problems.length)]

// Phrases that can be used in a sentence of the form ']J trains are not running between Foo and Bar <reason>']
const reasons = [
  [preposition, 'excessive pigeon activity'],
  [preposition, 'an unfortunate confluence of stoats'],
  [preposition, 'rapidly rising sea levels'],
  [preposition, 'construction'],
  [preposition, 'the unbearable lightness of being'],
  [preposition, 'malevolent bears'],
  [preposition, "the Trump administration's racist deportation policies"],
  [preposition, 'MTA garbage collection'],
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
  [conjunction, 'the signaling system is made of cheese']
]

export function reason() {
  const formula = [...reasons[Math.floor(Math.random()*reasons.length)]]
  for (let i = 0; i < formula.length; i++) {
    if (typeof formula[i] === 'function') formula[i] = formula[i]()
  }
  return formula.join(' ')
}
