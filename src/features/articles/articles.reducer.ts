import type { Article } from './articles.types'

export interface ArticlesState {
  articles: Article[]
  query: string
  isLoading: boolean
  error: string | null
}

export type ArticlesAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; articles: Article[] }
  | { type: 'LOAD_ERROR'; message: string }
  | { type: 'SET_QUERY'; query: string }

export const initialState: ArticlesState = {
  articles: [],
  query: '',
  isLoading: false,
  error: null,
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`)
}

export const reducer = (state: ArticlesState, action: ArticlesAction): ArticlesState => {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null }
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, articles: action.articles }
    case 'LOAD_ERROR':
      return { ...state, isLoading: false, error: action.message }
    case 'SET_QUERY':
      return { ...state, query: action.query }
    default:
      return assertNever(action)
  }
}
