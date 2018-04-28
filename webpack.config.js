// Adapted from https://gist.github.com/icebob/a37de30311fbfd770eaf5027bf779f5c – thanks!
var path = require('path')
var fs = require('fs')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true
  },

  entry: './stream/stream.js',

  output: {
    path: path.resolve(__dirname + '/build'),
    filename: 'bundle.js'
  },
  externals: nodeModules
}
