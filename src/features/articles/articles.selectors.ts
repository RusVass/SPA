import type { Article } from './articles.types'
import { filterAndSortArticles, parseKeywords } from './articles.search'

type VisibleArticlesResult = {
  keywords: string[]
  visible: Article[]
}

export const getVisibleArticles = (
  articles: Article[],
  query: string,
): VisibleArticlesResult => {
  if (articles.length === 0) {
    return { keywords: [], visible: [] }
  }

  const keywords = parseKeywords(query.trim())
  const visible = keywords.length === 0
    ? articles
    : filterAndSortArticles(articles, keywords)

  return { keywords, visible }
}

