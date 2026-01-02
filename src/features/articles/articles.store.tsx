import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import type { ReactElement } from 'react'

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

type ArticlesContextValue = {
  state: ArticlesState
  dispatch: Dispatch<ArticlesAction>
}

const initialState: ArticlesState = {
  articles: [],
  query: '',
  isLoading: false,
  error: null,
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}}`)
}

const reducer = (state: ArticlesState, action: ArticlesAction): ArticlesState => {
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

const ArticlesContext = createContext<ArticlesContextValue | undefined>(undefined)

export const ArticlesProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ArticlesContext.Provider value={{ state, dispatch }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = (): ArticlesContextValue => {
  const ctx = useContext(ArticlesContext)
  if (!ctx) {
    throw new Error('useArticles must be used inside ArticlesProvider')
  }
  return ctx
}

