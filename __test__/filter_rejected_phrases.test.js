import {eventFilter} from '../stream/filter.js'
import {RejectedPhraseError} from '../stream/errors.js'
import medicalHelp from './data/rejected_phrases/medical_help.json'
import fatal from './data/rejected_phrases/fatal.json'
import medicalAssistance from './data/rejected_phrases/medical_assistance.json'
import struckByATrain from './data/rejected_phrases/struck_by_a_train.json'
import unauthorized from './data/rejected_phrases/unauthorized.json'

describe('The rejected phrase filter', () => {
  // Mapping of disallowed phrases to tweets (in JSON form) that use that phrase.
  const disallowedPhrases = [
    ['medical help', medicalHelp],
    ['fatal', fatal],
    ['medical assistance', medicalAssistance],
    ['struck by a train', struckByATrain],
    ['unauthorized', unauthorized]
  ]

  // Generate a test on the fly for each of the above disallowed phrases.
  disallowedPhrases.forEach(async ([phrase, tweetObject]) => {
    /** Some tweets are longer than 140 characters
      (https://developer.twitter.com/en/docs/tweets/tweet-updates), which means
      that if a rejected phrase appears near the end of the tweet, it may not be
      caught here. Fixing this will probably require modifying the streaming
      client so it receives tweets with the full_text property. */
    test(`rejects a tweet using the phrase '${phrase}'`, async () => {
      await expect(eventFilter(tweetObject)).rejects.toEqual(
        [tweetObject.id_str, new RejectedPhraseError(phrase, tweetObject.text)]
      )
    })
  })
})
