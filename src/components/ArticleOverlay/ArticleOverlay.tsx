import { useEffect, useMemo, useState } from 'react'
import { Alert, Box, ButtonBase, CircularProgress, Modal, Typography } from '@mui/material'

import { fetchArticleById } from '../../api/articlesApi'
import type { Article, ArticleId } from '../../features/articles/articles.types'
import { useArticles } from '../../features/articles/articles.store'
import styles from './ArticleOverlay.module.scss'

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; article: Article }
  | { status: 'error'; message: string }

function toArticleId(value: number | null): ArticleId | null {
  if (!value) return null
  if (!Number.isInteger(value)) return null
  if (value <= 0) return null
  return value as ArticleId
}

interface Props {
  open: boolean
  articleId: number | null
  onClose: () => void
}

export function ArticleOverlay({ open, articleId, onClose }: Props): JSX.Element {
  const { state } = useArticles()
  const id = useMemo(() => toArticleId(articleId), [articleId])
  const [loadState, setLoadState] = useState<LoadState>({ status: 'idle' })

  const cached = useMemo(() => {
    if (!id) return null
    return state.articles.find((article) => article.id === id) ?? null
  }, [id, state.articles])

  useEffect(() => {
    if (!open) {
      setLoadState({ status: 'idle' })
      return
    }

    if (!id) {
      setLoadState({ status: 'error', message: 'Invalid article id' })
      return
    }

    if (cached) {
      setLoadState({ status: 'success', article: cached })
      return
    }

    setLoadState({ status: 'loading' })

    const fetchArticle = async (): Promise<void> => {
      try {
        const article = await fetchArticleById(id)
        setLoadState({ status: 'success', article })
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load article'
        setLoadState({ status: 'error', message })
      }
    }

    void fetchArticle()
  }, [open, id, cached])

  const canShowSuccess = loadState.status === 'success' && id && loadState.article.id === id

  function handleModalClose(_: unknown, reason?: 'backdropClick' | 'escapeKeyDown'): void {
    if (reason === 'backdropClick') return
    if (reason === 'escapeKeyDown') return
    onClose()
  }

  function handleClose(): void {
    onClose()
  }

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box className={styles.backdrop}>
        <Box className={styles.modal}>
          {loadState.status === 'loading' && (
            <Box className={styles.centered}>
              <CircularProgress />
            </Box>
          )}

          {loadState.status === 'error' && (
            <Box className={styles.centered}>
              <Alert severity="error">{loadState.message}</Alert>
            </Box>
          )}

          {canShowSuccess && (
            <>
              <Box className={styles.header}>
                <Typography variant="h6" className={styles.title}>
                  {loadState.article.title}
                </Typography>
              </Box>

              <Box className={styles.scrollArea}>
                <Typography variant="body2" className={styles.text}>
                  {loadState.article.summary}
                </Typography>
              </Box>

              <Box className={styles.footer}>
                <ButtonBase className={styles.backButton} onClick={handleClose}>
                  &larr; Back to homepage
                </ButtonBase>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

