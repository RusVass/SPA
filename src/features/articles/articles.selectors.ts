import type { Article } from './articles.types'
import { filterAndSortArticles, parseKeywords } from './articles.search'

export function getVisibleArticles(
  articles: Article[],
  query: string,
): { keywords: string[]; visible: Article[] } {
  const keywords = parseKeywords(query)
  const visible = filterAndSortArticles(articles, keywords)
  return { keywords, visible }
}

