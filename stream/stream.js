import {form} from '../components/forms'
import client from './client'
import {eventFilter} from './filter'
import {TRACK, NODE_ENV, NYCTSUBWAY} from './consts'

var stream = createStream()
attachEventHandlers(stream)

function createStream() {
  console.log('NODE_ENV', NODE_ENV, 'TRACK', TRACK)
  var query = {track: 'javascript'}
  if (TRACK === 'actual') query = {follow: NYCTSUBWAY}
  return client.stream('statuses/filter', query)
}

function attachEventHandlers(stream) {
  stream.delay = 10
  stream.on('data', function(event) {
    eventFilter(event)
    .then(() => {
      const link = `http://twitter.com/${event.user.screen_name}/status/${event.id_str}`
      const text = `${form()} ${link}`
      console.log('tweet composed:', text)
      if (NODE_ENV === 'production') client.sendTweet(text)
    })
    .catch(console.error)
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
