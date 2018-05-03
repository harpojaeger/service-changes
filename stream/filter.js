import {TRACK, NYCTSUBWAY} from './consts'

// Regex tests that should disqualify a tweet
const disallowedPhrases = [
  /struck by a train/im, // case-insensitive, multi-line search
  /medical assistance/im,
  /injured/im,
  /sick/im
]

export const eventFilter = event => {
  // Is this event actually a tweet?
  if (!(typeof event.contributors === 'object' && typeof event.id_str === 'string' && typeof event.text === 'string')) return false

  // Now that we're filtering by user ID, we get replies to this account as well. For now, filter these out (although it might be interesting to include them in the future).
  if (TRACK === 'actual' && event.user.id_str !== NYCTSUBWAY) return false

  // Is this a retweet of another user?
  if (event.hasOwnProperty('retweeted_status') && event.retweeted_status.user.id_str === event.user.id_str) return false

  // Is this a reply to another user?
  if (![null, event.user.id_str].includes(event.in_reply_to_user_id_str)) return false

  // check for disallowed phrases
  if (disallowedPhrases.some(el => el.test(event.text))) return false

  return true

}
