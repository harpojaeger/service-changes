// Parent class of errors thrown during filtering
class TweetFilterError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TweetFilterError'
  }
}

// Child error classes for the various filter exceptions.
export class NonTweetObjectError extends TweetFilterError {
  constructor() {
    super('This object is not a tweet.')
    this.name = 'NonTweetObjectError'
  }
}

// IgnoredTweetError can be used for replies to & from other users, as well as retweets of other users, so its message can be set per-instance.
export class IgnoredTweetError extends TweetFilterError {
  constructor(message) {
    super(message)
    this.name = 'IgnoredTweetError'
  }
}
// Error messages for ignored tweets.
export const REPLY_TO_OTHER_USER = 'Reply to other user.'
export const TWEET_FROM_OTHER_USER = 'Tweet from other user.'
export const RETWEET_OF_OTHER_USER = 'Retweet of other user.'
