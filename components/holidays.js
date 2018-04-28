const holidays = [
  'Boxing Day',
  'Shavuot',
  'Ramadan',
  'Kwanzaa',
  'Arbor Day',
  "St. Patrick's Day",
  'Easter',
  'Ash Wednesday',
  'Ascension Day',
  'Eid al-Fitr',
  "Ta'anit Esther", // Fast of Esther, a minor fast day observed on erev Purim
  'Celebration of the Golden Spurs', // a Flemish community celebration in Belgium
  'Dia de los Muertos',
]

export const holiday = () => holidays[Math.floor(Math.random()*holidays.length)]
