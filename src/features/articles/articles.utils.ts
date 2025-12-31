import type { Article } from './articles.types'

export function getResultsCount(articles: Article[], query: string): number {
  if (!query.trim()) {
    return 0
  }

  return articles.length
}

export function truncate(text: string, max: number): string {
  if (max <= 0) return ''
  if (text.length <= max) return text
  return `${text.slice(0, max)}…`
}

