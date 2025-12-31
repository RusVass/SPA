export type ArticleId = number

export type Article = {
  id: ArticleId
  title: string
  summary: string
  content?: string | null
  image_url: string | null
  published_at: string
}

export type PaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

