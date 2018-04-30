const stationdata = require('../data/stations.json')
const stations = stationdata.data

export function station(){
  return stations[Math.floor(Math.random()*stations.length)][10]
}
