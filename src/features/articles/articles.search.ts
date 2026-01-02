import type { Article } from './articles.types'

const TITLE_WEIGHT = 2
const DESCRIPTION_WEIGHT = 1

export const parseKeywords = (query: string): string[] => {
  const parts = query
    .toLowerCase()
    .split(/[\s,]+/g)
    .map((x) => x.trim())
    .filter(Boolean)

  return Array.from(new Set(parts))
}

const countIncludes = (text: string, keywords: string[]): number => {
  const value = text.toLowerCase()
  return keywords.reduce((acc, k) => (value.includes(k) ? acc + 1 : acc), 0)
}

export const filterAndSortArticles = (articles: Article[], keywords: string[]): Article[] => {
  if (keywords.length === 0) return articles

  const ranked = articles
    .map((article) => {
      const title = article.title ?? ''
      const description = article.summary ?? (article as { description?: string }).description ?? ''

      const titleHits = countIncludes(title, keywords)
      const descHits = countIncludes(description, keywords)

      return {
        article,
        titleHits,
        descHits,
        score: titleHits * TITLE_WEIGHT + descHits * DESCRIPTION_WEIGHT,
      }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (b.titleHits !== a.titleHits) return b.titleHits - a.titleHits
      return 0
    })

  return ranked.map((x) => x.article)
}

const escapeRegExp = (value: string): string => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const splitToHighlightParts = (
  text: string,
  keywords: string[],
): Array<{ text: string; isHit: boolean }> => {
  if (!text) return [{ text: '', isHit: false }]
  if (keywords.length === 0) return [{ text, isHit: false }]

  const pattern = keywords.map(escapeRegExp).filter(Boolean).join('|')
  if (!pattern) return [{ text, isHit: false }]

  const re = new RegExp(`(${pattern})`, 'gi')
  const hitRe = new RegExp(`^(${pattern})$`, 'i')
  const parts = text.split(re).filter(Boolean)

  return parts.map((part) => ({
    text: part,
    isHit: hitRe.test(part),
  }))
}


