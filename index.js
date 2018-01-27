const app = require('express')()
require ('dotenv').config()
const port = process.env.PORT || 5000
const bullet = require('./bullet')
const station = require('./stations')
const reason = require('./reasons')

app.get('/bullet', (req, res) => {
  res.send(bullet(req.query.alphanum, req.query.bulletcolor, req.query.textcolor))
})

app.get('/station', (req, res) => {
  station()
  .then(station => res.send(station))
  .catch(err => res.sendStatus(500))
})

app.get('/reason', (req, res) => {
  res.send(reason())
})

console.log('Server is running on port', port)
app.listen(port)
