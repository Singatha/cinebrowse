import { describe, expect, it } from 'vitest'
import { parsePage } from './useUrlPage'

describe('parsePage', () => {
  it.each([
    ['2', 2],
    ['1', 1],
    [undefined, 1],
    ['0', 1],
    ['-3', 1],
    ['2.5', 1],
    ['invalid', 1],
  ])('normalizes %s to %s', (value, expected) => {
    expect(parsePage(value)).toBe(expected)
  })
})
