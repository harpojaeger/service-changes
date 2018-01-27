const app = require('express')()
require ('dotenv').config()
const port = process.env.PORT || 5000
const bullet = require('./bullet')

app.get('/bullet', (req, res) => {
  res.send(bullet(req.query.letter))
})

console.log('Server is running on port', port)
app.listen(port)
