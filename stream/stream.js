import form from '../components/forms'
import client from './client'

var stream = createStream()
attachEventHandlers(stream)

function createStream() {
  return client.stream('statuses/filter', {track: 'javascript'})
}

function attachEventHandlers(stream) {
  stream.delay = 10
  stream.on('data', function(event) {
    // Check if this event is in fact a tweet (adapted from lodash method at https://www.npmjs.com/package/twitter)
    if (typeof event.contributors === 'object' && typeof event.id_str === 'string' && typeof event.text === 'string') {
      // Filter out retweets of other users
      if (!event.hasOwnProperty('retweeted_status') || event.retweetedStatus.user.id_str === event.user.id_str) {
        // Check that this tweet is not a reply, or is a reply to its own account (i.e. a thread)
        if ([null, event.user.id_str].includes(event.in_reply_to_user_id_str)) {
          const link = `http://twitter.com/${event.user.screen_name}/status/${event.id_str}`
          const text = `${form()} ${link}`
          console.log('tweet composed:', text)
          // client.sendTweet(text)
        } else {
          // console.log('Skipping a reply to another account:', event)
        }

      } else {
        // console.log('Skipping retweet event:', event)
      }
    } else {
      // console.log('Received non-tweet event:', event)
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
