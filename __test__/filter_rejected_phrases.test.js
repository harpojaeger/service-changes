import {eventFilter} from '../stream/filter.js'
import {RejectedPhraseError} from '../stream/errors.js'
import medicalHelp from './data/rejected_phrases/medical_help.json'

describe('The rejected phrase filter', () => {

  test('catches tweets with the phrase "medical help"', () => {
    expect.assertions(1)
    return expect(eventFilter(medicalHelp)).rejects.toEqual(
      [medicalHelp.id_str, new RejectedPhraseError('medical help', medicalHelp.text)]
    )
  })
})
