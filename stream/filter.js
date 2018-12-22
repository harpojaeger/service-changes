import {TRACK} from './consts'
import {
  NonTweetObjectError,
  IgnoredTweetError,
  TWEET_FROM_OTHER_USER,
  REPLY_TO_OTHER_USER,
  RETWEET_OF_OTHER_USER,
  RejectedPhraseError
} from './errors'
import client from './client'

// Phrases that should disqualify a tweet. These will be searched as a regex.
const disallowedPhrases = [
  'struck by a train',
  'medical assistance',
  'medical attention',
  'medical help',
  'injured',
  'sick',
  'unauthorized',
  'EMS',
]

export const eventFilter = async (event, stack = []) => {
  const {contributors, id_str, text, user, retweeted_status, in_reply_to_status_id_str, in_reply_to_user_id_str} = event

  // TODO change this so the old stack isn't added if empty. This will make thrown errors more comprehensible.
  const newStack = [...stack, id_str]

  try {
    // Is this event actually a tweet?
    if (!(typeof contributors === 'object' && typeof id_str === 'string' && typeof text === 'string')) throw new NonTweetObjectError()

    // The following errors should only be thrown if we're tracking a particular account.
    if (TRACK) {
      // Is this a reply to another user?
      if (in_reply_to_user_id_str && in_reply_to_user_id_str !== TRACK) throw new IgnoredTweetError(REPLY_TO_OTHER_USER)

      // Filter out tweets from other users, such as replies to the target account (it might be interesting to include them in the future).
      if (user.id_str !== TRACK) throw new IgnoredTweetError(TWEET_FROM_OTHER_USER)
    }

    // Is this a retweet of another user?
    if (retweeted_status && retweeted_status.user.id_str !== user.id_str) throw new IgnoredTweetError(RETWEET_OF_OTHER_USER)

    // check for disallowed phrases
    for (let i = 0; i < disallowedPhrases.length; i++) {
      const phrase = disallowedPhrases[i]
      const exp = new RegExp(phrase, 'im')
      if(exp.test(text)) throw new RejectedPhraseError(phrase, text)
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
