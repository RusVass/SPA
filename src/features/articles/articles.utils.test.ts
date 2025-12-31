import { describe, expect, it } from 'vitest'

import { getResultsCount, truncate } from './articles.utils'

describe('articles utils', () => {
  it('getResultsCount returns 0 for empty query', () => {
    expect(getResultsCount([{ id: 1 } as never], '')).toBe(0)
  })

  it('getResultsCount returns length when query exists', () => {
    expect(getResultsCount([{ id: 1 } as never, { id: 2 } as never], 'moon')).toBe(2)
  })

  it('truncate returns empty string when max <= 0', () => {
    expect(truncate('abc', 0)).toBe('')
  })
})
