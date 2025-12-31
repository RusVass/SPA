import { describe, expect, it } from 'vitest'

import type { Article } from './articles.types'
import { filterAndSortArticles, parseKeywords, splitToHighlightParts } from './articles.search'

describe('articles search', () => {
  it('parseKeywords trims, lowers and deduplicates', () => {
    expect(parseKeywords('  Moon, moon  Launch ')).toEqual(['moon', 'launch'])
  })

  it('filterAndSortArticles ranks title matches higher', () => {
    const articles: Article[] = [
      { id: 1, title: 'Moon landing update', summary: 'No mars', image_url: null, published_at: '2025-01-01' },
      { id: 2, title: 'Daily update', summary: 'Moon landing update inside summary', image_url: null, published_at: '2026-01-01' },
    ]

    const result = filterAndSortArticles(articles, ['moon'])
    expect(result.map((a) => a.id)).toEqual([1, 2])
  })

  it('filterAndSortArticles drops non matching articles', () => {
    const articles: Article[] = [
      { id: 1, title: 'Nothing', summary: 'Else', image_url: null, published_at: '2025-01-01' },
    ]

    const result = filterAndSortArticles(articles, ['moon'])
    expect(result).toHaveLength(0)
  })

  it('splitToHighlightParts splits and marks hits', () => {
    const parts = splitToHighlightParts('Moon mission', ['moon'])
    expect(parts).toEqual([
      { text: 'Moon', isHit: true },
      { text: ' mission', isHit: false },
    ])
  })
})


