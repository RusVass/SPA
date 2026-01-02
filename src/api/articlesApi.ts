import type { Article, ArticleId, PaginatedResponse } from '../features/articles/articles.types'
import { http } from './http'

export type FetchArticlesParams = {
  limit?: number
  offset?: number
}

export const fetchArticles = async (
  params: FetchArticlesParams = {},
): Promise<PaginatedResponse<Article>> => {
  const { limit = 12, offset = 0 } = params

  const res = await http.get<PaginatedResponse<Article>>('/articles', {
    params: { limit, offset, ordering: '-published_at' },
  })

  return res.data
}

export const fetchArticleById = async (id: ArticleId): Promise<Article> => {
  if (!id) {
    throw new Error('Article id is required')
  }

  const res = await http.get<Article>(`/articles/${id}`)
  return res.data
}

