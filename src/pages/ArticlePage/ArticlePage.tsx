import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/articlesApi'
import type { Article, ArticleId } from '../../features/articles/articles.types'
import { useArticles } from '../../features/articles/articles.store'
import styles from './ArticlePage.module.scss'

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; article: Article }
  | { status: 'error'; message: string }

function toArticleId(value: string | undefined): ArticleId | null {
  if (!value) return null
  const n = Number(value)
  if (!Number.isFinite(n)) return null
  if (!Number.isInteger(n)) return null
  if (n <= 0) return null
  return n as ArticleId
}

export function ArticlePage(): JSX.Element {
  const navigate = useNavigate()
  const params = useParams()
  const id = useMemo(() => toArticleId(params.id), [params.id])

  const { state } = useArticles()
  const [loadState, setLoadState] = useState<LoadState>({ status: 'idle' })

  const cached = useMemo(() => {
    if (!id) return null
    return state.articles.find((a) => a.id === id) ?? null
  }, [id, state.articles])

  useEffect(() => {
    if (!id) {
      setLoadState({ status: 'error', message: 'Invalid article id' })
      return
    }

    if (cached) {
      setLoadState({ status: 'success', article: cached })
      return
    }

    void load(id)
  }, [id, cached])

  async function load(articleId: ArticleId): Promise<void> {
    setLoadState({ status: 'loading' })
    try {
      const article = await fetchArticleById(articleId)
      setLoadState({ status: 'success', article })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load article'
      setLoadState({ status: 'error', message })
    }
  }

  function handleBack(): void {
    navigate('/')
  }

  return (
    <Box className={styles.wrapper}>
      <Container maxWidth={false} className={styles.page}>
        <Box className={styles.inner}>
          <Box className={styles.back}>
            <Button variant="text" size="small" onClick={handleBack}>
              ← Back to results
            </Button>
          </Box>

          {loadState.status === 'loading' && <CircularProgress />}

          {loadState.status === 'error' && <Alert severity="error">{loadState.message}</Alert>}

          {loadState.status === 'success' && (
            <Box className={styles.card}>
              {loadState.article.image_url && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={loadState.article.image_url}
                    alt={loadState.article.title}
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
              <Typography variant="h5" component="h1">
                {loadState.article.title}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {new Date(loadState.article.published_at).toLocaleDateString()}
              </Typography>

              <Typography sx={{ mt: 2 }} variant="body1">
                {loadState.article.summary}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

