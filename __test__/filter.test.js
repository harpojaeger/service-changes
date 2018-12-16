import {eventFilter} from '../stream/filter.js'

describe('The filter module', () => {
  test('rejects non-tweet objects', () => {
    expect.assertions(1);
    return expect(eventFilter({foo: 'bar'})).rejects.toEqual(
      [undefined, 'Not a tweet']);
  })
})
