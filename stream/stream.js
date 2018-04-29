import form from '../components/forms'
import client from './client'
require('dotenv').config()
const {NODE_ENV} = process.env

var stream = createStream()
attachEventHandlers(stream)

function createStream() {
  console.log('NODE_ENV', NODE_ENV)
  var track = 'javascript'
  if (NODE_ENV === 'production') track = 'list:notmta/mta'
  return client.stream('statuses/filter', {track})
}

function attachEventHandlers(stream) {
  stream.delay = 10
  stream.on('data', function(event) {
    if (eventFilter(event)) {
      const link = `http://twitter.com/${event.user.screen_name}/status/${event.id_str}`
      const text = `${form()} ${link}`
      console.log('tweet composed:', text)
      if (NODE_ENV === 'production') client.sendTweet(text)
    } else {
      console.log('Rejected event', event)
    }
  })

  // This doesn't work very well
  stream.on('error', function(error) {
    console.error('Received streaming error.', error)
    const {delay} = stream
    console.error('Sleeping', delay, 'seconds')
    stream.destroy()
    setTimeout(() => {
      console.log('Restarting.')
      stream = createStream()
      attachEventHandlers(stream)
      stream.delay = delay * 2
    }, delay*1000)
  })
}

// Set up filters to screen out tweets we're not interested in
function eventFilter (event) {
  // Is this event actually a tweet?
  if (!(typeof event.contributors === 'object' && typeof event.id_str === 'string' && typeof event.text === 'string')) return false

  // Is this a retweet of another user?
  if (event.hasOwnProperty('retweeted_status') && event.retweeted_status.user.id_str === event.user.id_str) return false

  // Is this a reply to another user?
  if (![null, event.user.id_str].includes(event.in_reply_to_user_id_str)) return false

  // Filter out statuses about someone being struck by a train
  if (/struck by a train/im.test(event.text)) return false

  return true
}
