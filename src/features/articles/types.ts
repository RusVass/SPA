export interface Article {
  id: number
  title: string
  url: string
  image_url: string
  content?: string | null
  summary: string
  published_at: string
  updated_at?: string
  news_site: string
  featured: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export type ArticlesResponse = PaginatedResponse<Article>

