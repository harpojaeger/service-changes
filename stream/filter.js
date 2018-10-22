import {TRACK} from './consts'
import client from './client'

// Phrases that should disqualify a tweet. These will be searched as a regex.
const disallowedPhrases = [
  'struck by a train',
  'medical assistance',
  'injured',
  'sick',
  'unauthorized',
  'EMS',
]

export const eventFilter = async (event, stack = []) => {
  const {contributors, id_str, text, user, retweeted_status, in_reply_to_status_id_str, in_reply_to_user_id_str} = event

  const newStack = [...stack, id_str]

  try {
    // Is this event actually a tweet?
    if (!(typeof contributors === 'object' && typeof id_str === 'string' && typeof text === 'string')) throw 'Not a tweet'

    // Filter out replies to the target account (it might be interesting to include them in the future). Return false to prevent these from being logged in the DB, which is unnecessary.
    if (TRACK && user.id_str !== TRACK) throw 'Reply from other user'

    // Is this a retweet of another user?
    if (retweeted_status && retweeted_status.user.id_str !== user.id_str) throw 'Retweet of other user'

    // Is this a reply to another user?
    if (![null, user.id_str].includes(in_reply_to_user_id_str)) throw 'Reply to other user'

    // check for disallowed phrases
    for (let i = 0; i < disallowedPhrases.length; i++) {
      const phrase = disallowedPhrases[i]
      const exp = new RegExp(phrase, 'im')
      if(exp.test(text)) throw `Rejected phrase: ${text}`
    }

    // recursively check that this is not a retweet or reply of an excluded tweet.
    var ancestorTweet
    if (retweeted_status) {
      client.addTweetToCache(retweeted_status)
      ancestorTweet = retweeted_status
    } else if (in_reply_to_status_id_str) {
      ancestorTweet = await client.getTweet(in_reply_to_status_id_str)
    }
    if (ancestorTweet) {
      return eventFilter(ancestorTweet, newStack)
    }
  }
  catch(e) {
    newStack.push(e)
    return Promise.reject(newStack)
  }
  return Promise.resolve()
}
