function svg(letter = null, bulletcolor = null, textcolor = null){
  if (letter === null) {
    letter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  }
  const header = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100">'
  const circle = '<circle cx="50" cy="50" r="40" fill="#ff6319" />'
  const text = `<text x="50" y="50" text-anchor="middle" dy=".35em"
  Sorry, your browser does not support inline SVG.
   font-family="Helvetica" font-weight="bold" font-size="60" fill="white">
   ` + letter + '</text>'
  const footer = '</svg>'

  const svg = header + circle + text + footer
  return svg

}

module.exports = svg
