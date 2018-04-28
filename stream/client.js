import Twitter from 'twitter'
import dotenv from 'dotenv'
dotenv.config()

const {consumer_key, consumer_secret, access_token_key, access_token_secret} = process.env
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

client.sendTweet = function(text) {
  this.post('statuses/update', {status: text},  function(error, tweet, response) {
    if (error) {
      console.error('Error posting tweet:', error)
    } else {
      console.log('Received response from statuses/update', response)
    }
  })
}

export default client
