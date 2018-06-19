import {TRACK, NYCTSUBWAY, NODE_ENV} from './consts'
const knex = require('knex')(require('../knexfile.js')[NODE_ENV])

// Phrases that should disqualify a tweet. These will be searched as a regexp.
const disallowedPhrases = [
  'struck by a train',
  'medical assistance',
  'injured',
  'sick'
]

export const eventFilter = event => {
  return checkForExclusion(event)
  .then(() => Promise.resolve())
  .catch(({tweet_id, reason, detail}) => {
    console.error('received exlusion', tweet_id, reason, detail)
    recordExclusion({tweet_id, reason, detail})
    return Promise.reject('Tweet rejected by filter. Exclusion recorded.')
  })
}

const checkForExclusion = event => {
  const {contributors, id_str, text, user, retweeted_status, in_reply_to_status_id, in_reply_to_user_id_str} = event
  // Is this event actually a tweet?
  if (!(typeof contributors === 'object' && typeof id_str === 'string' && typeof text === 'string')) return Promise.reject({tweet_id: id_str, reason: 'Not a tweet'})

  // Now that we're filtering by user ID, we get replies to this account as well. For now, filter these out (although it might be interesting to include them in the future).
  if (TRACK === 'actual' && user.id_str !== NYCTSUBWAY) return Promise.reject({tweet_id: id_str, reason: 'Not a tweet from @NYCTSUBWAY'})
  // TODO set up the filter so these tweets are not logged in the DB.

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

  // check that this is not a retweet or reply of a previously-excluded tweet.
  var idToSearch
  if (retweeted_status) idToSearch = retweeted_status.id_str
  if (in_reply_to_status_id) idToSearch = in_reply_to_status_id
  if (idToSearch) {
    console.log('searching for tweet', idToSearch, 'in previously excluded tweets')
    return knex.select('tweet_id').from('excluded').where({tweet_id: idToSearch})
    .then(rows => {
      if (rows.length > 0) {
        const {tweet_id} = rows[0]
        const reason = `${retweeted_status ? 'retweet of' : 'reply to'} previously-excluded tweet`
        return Promise.reject({tweet_id: id_str, reason, detail: tweet_id})
      } else {
        console.log('tweet', idToSearch, 'was not previously excluded')
      }
    })
  }

  return Promise.resolve()
}

const recordExclusion = ({tweet_id, reason, detail}) => knex('excluded').insert({tweet_id, reason, detail})
.then(inserted => (console.log('inserted exclusion', inserted)))
