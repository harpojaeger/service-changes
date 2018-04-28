import form from '../forms'
import client from './client'

var stream = createStream()
attachEventHandlers(stream)

function createStream() {
  return client.stream('statuses/filter', {track: 'trump'})
}

function attachEventHandlers(stream) {
  var counter = 0
  stream.on('data', function(event) {
    // Check if this event is in fact a tweet (adapted from lodash method at https://www.npmjs.com/package/twitter)
    if (typeof event.contributors === 'object' && typeof event.id_str === 'string' && typeof event.text === 'string') {
      // We're only interested in original tweets, not retweets
      if (!event.hasOwnProperty('retweeted_status')) {
        // Check that this tweet is not a reply, or is a reply to its own account (i.e. a thread)
        if ([null, event.user.id_str].includes(event.in_reply_to_user_id_str)) {
          const link = `http://twitter.com/${event.user.screen_name}/status/${event.id_str}`
          const text = `${form()} ${link}`
          console.log(text)
          if (counter === 0) {
            client.sendTweet(text)
            counter++
          }
        } else {
          console.log('Skipping a reply to another account:', event)
        }

      } else {
        console.log('Skipping retweet event:', event)
      }
    } else {
      console.log('Received non-tweet event:', event)
    }
  })

  stream.on('error', function(error) {
    console.error(`Received streaming error ${error.code}, restarting.`, error)
    stream.destroy()
    setTimeout(() => {
      stream = createStream()
      attachEventHandlers(stream)
    })
  })
}
