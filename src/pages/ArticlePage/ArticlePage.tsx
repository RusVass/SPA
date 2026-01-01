import { useEffect, useState, type JSX } from 'react'
import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/articlesApi'
import type { Article, ArticleId } from '../../features/articles/articles.types'
import styles from './ArticlePage.module.scss'

export function ArticlePage(): JSX.Element {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError('Invalid article id')
      setIsLoading(false)
      return
    }

    let isCancelled = false
    const parsedId = Number(id)
    if (!Number.isFinite(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
      setError('Invalid article id')
      setIsLoading(false)
      return
    }

    async function load(): Promise<void> {
      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchArticleById(parsedId as ArticleId)
        if (!isCancelled) setArticle(data)
      } catch (err) {
        if (!isCancelled) setError(err instanceof Error ? err.message : 'Failed to load article')
      } finally {
        if (!isCancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      isCancelled = true
    }
  }, [id])

  const summaryParagraphs = (article?.summary ?? '')
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div className={styles.page}>
      <div
        className={styles.hero}
        style={{ backgroundImage: `url(${article?.image_url ?? ''})` }}
      />

      <div className={styles.content}>
        <div className={styles.contentInner}>
          {isLoading && <CircularProgress />}

          {!isLoading && error && <Alert severity="error">{error}</Alert>}

          {!isLoading && !error && article && (
            <>
              <div className={styles.cardWrap}>
                <div className={styles.card}>
                  <h1 className={styles.title}>{article.title}</h1>

                  <div className={styles.body}>
                    {summaryParagraphs.map((p, idx) => (
                      <Typography key={idx} className={styles.paragraph} component="p">
                        {p}
                      </Typography>
                    ))}
                  </div>
                </div>
              </div>

              <Box className={styles.back}>
                <RouterLink className={styles.backLink} to="/">
                  ← Back to homepage
                </RouterLink>
              </Box>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

