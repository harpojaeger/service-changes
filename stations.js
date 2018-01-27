function randomStation(){
  return new Promise((resolve, reject) => {
    const stationdata = require('./stationdata.json')
    const stations = stationdata.data
    let station = stations[Math.floor(Math.random()*stations.length)][10]
    resolve(station)
  })
}
module.exports = randomStation
