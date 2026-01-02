import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import type { ReactElement } from 'react'

import { initialState, reducer, type ArticlesState, type ArticlesAction } from './articles.reducer'

type ArticlesContextValue = {
  state: ArticlesState
  dispatch: Dispatch<ArticlesAction>
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

// eslint-disable-next-line react-refresh/only-export-components
export const useArticles = (): ArticlesContextValue => {
  const ctx = useContext(ArticlesContext)
  if (!ctx) {
    throw new Error('useArticles must be used inside ArticlesProvider')
  }
  return ctx
}

