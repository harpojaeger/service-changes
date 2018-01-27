const app = require('express')()
require ('dotenv').config()
const port = process.env.PORT || 5000
const trains = require('./trains')
const station = require('./stations')
const reason = require('./reasons')
const form = require('./forms')

app.get('/bullet', (req, res) => {
  res.send(trains(req.query.alphanum, req.query.bulletcolor, req.query.textcolor).bullet)
})

app.get('/station', (req, res) => {
  station()
  .then(station => res.send(station))
  .catch(err => res.sendStatus(500))
})

app.get('/reason', (req, res) => {
  res.send(reason())
})

app.get('/form', (req, res) => {
  res.send(form())
})

console.log('Server is running on port', port)
app.listen(port)
