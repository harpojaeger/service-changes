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
