import type { Article } from './articles.types'

export const getResultsCount = (articles: Article[], query: string): number => {
  if (!query.trim()) {
    return 0
  }

  return articles.length
}

export const truncate = (text: string, max: number): string => {
  if (max <= 0) return ''
  if (text.length <= max) return text

  return `${text.slice(0, max)}…`
}

export const formatPublishedDate = (value: string): string => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const day = date.getDate()
  const suffix = getOrdinalSuffix(day)

  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()

  return `${month} ${day}${suffix}, ${year}`
}

const getOrdinalSuffix = (day: number): string => {
  const mod100 = day % 100
  if (mod100 >= 11 && mod100 <= 13) return 'th'

  const mod10 = day % 10
  if (mod10 === 1) return 'st'
  if (mod10 === 2) return 'nd'
  if (mod10 === 3) return 'rd'

  return 'th'
}

