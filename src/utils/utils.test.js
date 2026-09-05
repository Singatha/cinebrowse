import { describe, expect, it } from 'vitest'
import { formatGenresByID, formatGenresByName, formatTime } from './utils'

describe('media formatting utilities', () => {
  it('formats known genre IDs and ignores unknown IDs', () => {
    expect(formatGenresByID([28, 999999, 35])).toBe('Action, Comedy')
    expect(formatGenresByID()).toBe('')
  })

  it('formats genre objects safely', () => {
    expect(formatGenresByName([{ name: 'Drama' }, {}, { name: 'Mystery' }])).toBe('Drama, Mystery')
    expect(formatGenresByName()).toBe('')
  })

  it.each([
    [45, '45min'],
    [60, '1h'],
    [125, '2h 5min'],
    [undefined, 'Not available'],
    [0, 'Not available'],
  ])('formats a runtime of %s as %s', (runtime, expected) => {
    expect(formatTime(runtime)).toBe(expected)
  })
})
