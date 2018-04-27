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

const stream = client.stream('statuses/filter', {track: 'javascript'})
stream.on('data', function(event) {
  console.log(event)
  console.log(`a tweet: http://twitter.com/${event.user.screen_name}/status/${event.id_str}`)
})
stream.on('error', function(error) {
  console.error(error)
})
