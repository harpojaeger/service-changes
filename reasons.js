// Phrases that can be used in a sentence of the form 'J trains are not running between Foo and Bar because of <reason>'
const reasons = [
  'excessive pigeon activity',
  'an unfortunate confluence of stoats',
  'rapidly rising sea levels',
  'construction',
  'the unbearable lightness of being',
  'malevolent bears',
  "the Trump administration's racist deportation policies",
  'MTA garbage collection'
]

function reason(){
  return reasons[Math.floor(Math.random()*reasons.length)]
}

module.exports = reason
