#!/usr/bin/env ./node_modules/.bin/babel-node
// You need babel-node to run this script. From the root dir of this project, you should be able to do util/fetchtweet.js. You can also use npx.
// Call this script with one or more Tweet IDs as arguments. With one argument, it returns the tweet details as a JSON object. With more than one argument, it returns an array of JSON objects (not necessarily in the same order as the arguments).

import client from '../stream/client.js'
// argv[0] should be the path to node, and argv[1] should be the path to this script.
const ids = process.argv.slice(2)

if (ids.length > 1) {
  Promise.all(ids.map(client.getTweet)).then(details => console.log(JSON.stringify(details)))
} else if (ids.length === 1) {
  client.getTweet(ids[0]).then(details => console.log(JSON.stringify(details))
)
}
