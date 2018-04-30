const app = require('express')()
require ('dotenv').config()
const port = process.env.PORT || 5000
const trains = require('./components/trains')
const station = require('./components/stations')
import {reason} from './components/reasons'
import {form} from './components/forms'

app.get('/bullet', (req, res) => {
  res.send(trains(req.query.alphanum, req.query.bulletcolor, req.query.textcolor).bullet)
})

app.get('/station', (req, res) => {
  station()
    .then(station => res.send(station))
    .catch(err => {
      console.error(err)
      res.sendStatus(500)
    })
})

app.get('/reason', (req, res) => {
  res.send(reason())
})

app.get('/change', (req, res) => {
  res.status(200).send(form())
})

console.log('Server is running on port', port)
app.listen(port)
