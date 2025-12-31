import { createContext, useContext, useReducer, type ReactNode } from 'react'

import type { Article } from './articles.types'

interface ArticlesState {
  articles: Article[]
  query: string
  isLoading: boolean
  error: string | null
}

type ArticlesAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; articles: Article[] }
  | { type: 'LOAD_ERROR'; message: string }
  | { type: 'SET_QUERY'; query: string }

const initialState: ArticlesState = {
  articles: [],
  query: '',
  isLoading: false,
  error: null,
}

function reducer(state: ArticlesState, action: ArticlesAction): ArticlesState {
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
      return state
  }
}

const ArticlesContext = createContext<{ state: ArticlesState; dispatch: React.Dispatch<ArticlesAction> } | undefined>(
  undefined,
)

export function ArticlesProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <ArticlesContext.Provider value={{ state, dispatch }}>{children}</ArticlesContext.Provider>
}

export function useArticles(): { state: ArticlesState; dispatch: React.Dispatch<ArticlesAction> } {
  const ctx = useContext(ArticlesContext)
  if (!ctx) {
    throw new Error('useArticles must be used inside ArticlesProvider')
  }
  return ctx
}

