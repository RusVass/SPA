import type { Article, ArticleId, PaginatedResponse } from '../features/articles/articles.types'
import { http } from './http'

export type FetchArticlesParams = {
  limit?: number
  offset?: number
}

export async function fetchArticles(params: FetchArticlesParams = {}): Promise<PaginatedResponse<Article>> {
  const { limit = 12, offset = 0 } = params

  const res = await http.get<PaginatedResponse<Article>>('/articles', {
    params: { limit, offset, ordering: '-published_at' },
  })

  return res.data
}

export async function fetchArticleById(id: ArticleId): Promise<Article> {
  const res = await http.get<Article>(`/articles/${id}`)
  return res.data
}

