import type { JSX } from 'react'
import { useCallback, useEffect } from 'react'
import { Alert, CircularProgress, Typography } from '@mui/material'

import { fetchArticles } from '../../api/articlesApi'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { getVisibleArticles } from '../../features/articles/articles.selectors'
import { getResultsCount } from '../../features/articles/articles.utils'
import { useArticles } from '../../features/articles/articles.store'
import styles from './ArticlesPage.module.scss'

export function ArticlesPage(): JSX.Element {
  const { state, dispatch } = useArticles()
  const { keywords, visible } = getVisibleArticles(state.articles, state.query)
  const resultsCount = getResultsCount(visible, state.query)

  const load = useCallback(async (): Promise<void> => {
    dispatch({ type: 'LOAD_START' })
    try {
      const data = await fetchArticles({ limit: 24, offset: 0 })
      dispatch({ type: 'LOAD_SUCCESS', articles: data.results })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load articles'
      dispatch({ type: 'LOAD_ERROR', message })
    }
  }, [dispatch])

  useEffect(() => {
    void load()
  }, [load])

  function handleQueryChange(value: string): void {
    dispatch({ type: 'SET_QUERY', query: value })
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.search}>
            <SearchBar value={state.query} onChange={handleQueryChange} />
          </div>
        </div>

        <Typography variant="subtitle1" sx={{ color: '#000000', fontWeight: 600, mb: 2 }}>
          Results: {resultsCount}
        </Typography>

        {state.isLoading && <CircularProgress />}

        {state.error && <Alert severity="error">{state.error}</Alert>}

        {!state.isLoading && !state.error && (
          <div className={styles.grid}>
            {visible.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                keywords={keywords}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

