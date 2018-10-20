import {TRACK} from './consts'
import client from './client'

// Phrases that should disqualify a tweet. These will be searched as a regexp.
const disallowedPhrases = [
  'struck by a train',
  'medical assistance',
  'injured',
  'sick'
]

export const eventFilter = async event => {
  const {contributors, id_str, text, user, retweeted_status, in_reply_to_status_id_str, in_reply_to_user_id_str} = event
  // Is this event actually a tweet?
  if (!(typeof contributors === 'object' && typeof id_str === 'string' && typeof text === 'string')) return Promise.reject({tweet_id: id_str, reason: 'Not a tweet'})

  // Filter out replies to the target account (it might be interesting to include them in the future). Return false to prevent these from being logged in the DB, which is unnecessary.
  if (TRACK && user.id_str !== TRACK) return Promise.reject(false)

  // Is this a retweet of another user?
  if (retweeted_status && retweeted_status.user.id_str === user.id_str) return Promise.reject({tweet_id: id_str, reason: 'Retweet of other user', detail: retweeted_status.user.id_str})

  // Is this a reply to another user?
  if (![null, user.id_str].includes(in_reply_to_user_id_str)) return Promise.reject({tweet_id: id_str, reason: 'Reply to other user', detail: in_reply_to_user_id_str})

  // check for disallowed phrases
  for (let i = 0; i < disallowedPhrases.length; i++) {
    const phrase = disallowedPhrases[i]
    const exp = new RegExp(phrase, 'im')
    if(exp.test(text)) return Promise.reject({tweet_id: id_str, reason: 'Rejected phrase', detail: phrase})
  }

  // recursively check that this is not a retweet or reply of an excluded tweet.
  var ancestorTweet
  if (retweeted_status) {
    console.log(id_str, 'is a retweet')
    client.addTweetToCache(retweeted_status)
    ancestorTweet = retweeted_status
  } else if (in_reply_to_status_id_str) {
    console.log(id_str, 'is a reply')
    ancestorTweet = await client.getTweet(in_reply_to_status_id_str)
  }
  if (ancestorTweet) {
    console.log(ancestorTweet.id_str, 'is the ancestor tweet to', id_str)
    return eventFilter(ancestorTweet)
    // const ancestorExclusion = await eventFilter(ancestorTweet)
    // console.log('ancestor exclusion is', ancestorExclusion)
  } else {
    console.log('no ancestor tweet found')
    return Promise.resolve()
  }

}
