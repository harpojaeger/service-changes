import {eventFilter} from '../stream/filter.js'
import {
  NonTweetObjectError,
  IgnoredTweetError,
  REPLY_TO_OTHER_USER,
  TWEET_FROM_OTHER_USER
} from '../stream/errors.js'
import replyToOtherUser from './data/reply_to_other_user.json'
import tweetFromOtherUser from './data/tweet_from_other_user.json'

describe('The filter module', () => {

  test('rejects non-tweet objects', () => {
    expect.assertions(1)
    return expect(eventFilter({foo: 'bar'})).rejects.toEqual(
      [undefined, new NonTweetObjectError()])
  })

  test('rejects replies to other users', () => {
    expect.assertions(1)
    return expect(eventFilter(replyToOtherUser)).rejects.toEqual(
      [replyToOtherUser.id_str, new IgnoredTweetError(REPLY_TO_OTHER_USER)]
    )
  })

  test('rejects tweet from other users', () => {
    expect.assertions(1)
    return expect(eventFilter(tweetFromOtherUser)).rejects.toEqual(
      [tweetFromOtherUser.id_str, new IgnoredTweetError(TWEET_FROM_OTHER_USER)]
    )
  })

})
