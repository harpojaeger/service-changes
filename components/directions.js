const compassDirections = [
  'north',
  'south',
  'east',
  'west',
  'northeast',
  'southeast',
  'southwest',
  'northwest',
  'north-northeast',
  'east-northeast',
  'east-southeast',
  'south-southeast',
  'south-southwest',
  'west-southwest',
  'west-northwest',
  'north-northwest'
]

export function compassDirection({cap = false} = {}) {
  var compassDirection = compassDirections[Math.floor(Math.random()*compassDirections.length)]
  if (cap) compassDirection = `${compassDirection.charAt(0).toUpperCase()}${compassDirection.slice(1)}`
  return compassDirection
}
