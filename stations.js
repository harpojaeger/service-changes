const stationdata = require('./stationdata.json')
const stations = stationdata.data

function randomStation(){
  return stations[Math.floor(Math.random()*stations.length)][10]
}
module.exports = randomStation
