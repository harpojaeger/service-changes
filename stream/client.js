import Twitter from 'twitter'
import {consumer_key, consumer_secret, access_token_key, access_token_secret} from './consts'

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

client.sendTweet = function(status) {
  this.post('statuses/update', {status},  function(error, tweet, response) {
    if (error) {
      console.error('Error posting tweet:', error)
    } else {
      console.log('Tweet sent successfully.', tweet)
    }
  })
}

var tweetDetailsMap = {}
// Caching-enabled function for retrieving tweet details
client.getTweet = async function(id) {
  if(tweetDetailsMap[id]) {
    console.log('found tweet', id, 'in cache')
    return Promise.resolve(tweetDetailsMap[id])
  } else {
    // console.log('tweet', id, 'not found in cache')
    var tweetDetails
    try {
      tweetDetails = await client.get('statuses/show', {id})
    }
    catch(e) {
      console.error('error fetching tweet details', e)
    }

    client.addTweetToCache(tweetDetails)
    return Promise.resolve(tweetDetails)
  }
}

client.addTweetToCache = function(tweet) {
  if(Object.keys(tweetDetailsMap).length > 1000) { // very basic cache mgmt
    console.log('cache reset')
    tweetDetailsMap = {}
  }
  if(!tweetDetailsMap[tweet.id_str]) {
    console.log('tweet', tweet.id_str, 'added to cache')
    tweetDetailsMap[tweet.id_str] = tweet
  }
}

export default client
