// Thank G*d for https://en.wikipedia.org/wiki/New_York_City_Subway_nomenclature
const WHITE = '#fff'
const BLACK = '#000'
const colors =
[
  { // IND Eigth Avenue Line
    background: '#2850ad',
    text: WHITE
  },
  { // IND Sixth Avenue Line
    background: '#ff6319',
    text: WHITE
  },
  { // IND Crosstown Line
    background: '#6cbe45',
    text: WHITE
  },
  { // BMT Canarsie Line
    background: '#a7a9ac',
    text: WHITE
  },
  { // BMT Nassau Street Line
    background: '#996633',
    text: WHITE
  },
  { // BMT Broadway Line
    background: '#fccc0a',
    text: BLACK
  },
  { // BMT Broadway-Seventh Avenue Line
    background: '#ee352e',
    text: WHITE
  },
  { // IRT Lexington Avenue Line
    background: '#00933c',
    text: WHITE
  },
  { // IRT Flushing Line
    background: '#b933ad',
    text: WHITE
  },
  { // Shuttles
    background: '#808183',
    text: WHITE
  }
]

// An array with all uppercase letters and digits 0-9 in it.
const letters = Array(26).fill('').map((el, i) => String.fromCharCode(i+65))
const numbers = Array(10).fill('').map((el, i) => String.fromCharCode(48+i))
const chars = [...letters,...numbers]


function svg(alphanum = null, bulletcolor = null, textcolor = null){
  if (alphanum === null) {
    alphanum = chars[Math.floor(Math.random() * 36)]
  }
  if (bulletcolor === null){
    const i = Math.floor(Math.random() * colors.length)
    bulletcolor = colors[i].background
    textcolor = colors[i].text
  }
  var bullet = `<circle cx="50" cy="50" r="40" fill="${bulletcolor}" />`
  // 2 of 25 NYC Subway trains are express. Is this one?
  if(Math.floor(Math.random()*26) < 3){
    bullet = `<polygon points="50,0 100,50, 50, 100, 0,50" fill="${bulletcolor}"/>`
  }
  return `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100">
      ${bullet}
      <text x="50" y="50" text-anchor="middle" dy=".35em" font-family="Helvetica" font-weight="bold" font-size="60" fill="${textcolor}">
        ${alphanum}
      </text>
    </svg>
  `

}

module.exports = svg
