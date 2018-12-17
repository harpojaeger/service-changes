import {eventFilter} from '../stream/filter.js'
import {NonTweetObjectError, IgnoredTweetError} from '../stream/errors.js'

// Environment variables to make available in jest tests via process.env. These will overwrite any values already set via any other method, so they can be relied upon for testing.
const testingEnvs = {
  track: 1053738493216735232, // @NYCTSUBWAY, so we can test the reply and retweet filters.
}

describe('The filter module', () => {

  // Explicitly provide envs to each Jest test.
  beforeEach(() => {
    process.env = Object.assign(process.env, testingEnvs)
  })

  test('rejects non-tweet objects', () => {
    expect.assertions(1)
    return expect(eventFilter({foo: 'bar'})).rejects.toEqual(
      [undefined, new NonTweetObjectError])
  })
  
})
