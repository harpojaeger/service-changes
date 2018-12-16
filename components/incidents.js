const incidents = [
  'maple syrup spill',
  'shark attack',
  'Bat Mitzvah',
  'prolonged drum solo',
  'oppossum sighting',
  'snail attack',
  'marshmallow explosion',
  'careful academic inquiry',
  'long speech on the need for a renewed global Marxist politic',
  'string cheese investigation',
  'molasses disaster',
]

export const incident = () => incidents[Math.floor(Math.random()*incidents.length)]
