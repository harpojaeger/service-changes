const relativeTimes = [
  'tomorrow',
  'this evening',
  'tomorrow evening',
  'this weekend',
  'next month',
  'next year',
  'this spring',
  'this summer',
  'this fall',
  'this winter',
]

const untils = [
  'we can remember the words to Careless Whisper',
  'mountains skip like rams, hills like sheep',
  'Gozer the Traveller comes in one of the pre-chosen forms',
  'the rectification of the Vuldronaii',
  'the third reconciliation of the last of the Meketrex Supplicants',
  'further notice',
  'Amtrak gets their act together and standardizes all-door boarding',
  'the identities of the Final Five are revealed',
  'a suitable source of Tylium is identified',
  'humankind has answered for its terrible deeds',
  'Commander Riker learns to sit down in a chair like a normal human being',
  'the Singularity',
  'Chewbacca gets a paid translator',
  "the rocks melt with the sun, my love, 'til the rocks melt with the sun",
  'the guy in the gorilla suit gets a seat',
  'the graffiti artist gets his damn spray cans back',
  'the oligarchs roam the streets with begging bowls',
  'Rudy Giuliani gets indicted',
  'Mike Bloomberg moves to Cuba',
  'you are personally fired for lateness',
  'no one can afford any apartment anywhere'
]

// TODO make this sometime return just an hour, sometimes H:M, sometimes H:MS, just for added surrealism.
export const specificTime = () => new Date(Math.floor(Math.random()*1000*60*60*24)).toLocaleTimeString('en-US')

export const relativeTime = () => relativeTimes[Math.floor(Math.random()*relativeTimes.length)]

export const until = () => untils[Math.floor(Math.random()*untils.length)]
