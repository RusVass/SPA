import { useState, type JSX, type MouseEvent } from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

import type { Article } from '../../features/articles/articles.types'
import { truncate } from '../../features/articles/articles.utils'
import { HighlightText } from '../HighlightText/HighlightText'
import styles from './ArticleCard.module.scss'

interface Props {
  article: Article
  keywords: string[]
  isOpen: boolean
  onOpen: (article: Article) => void
  onClose: () => void
}

export function ArticleCard({ article, keywords, isOpen, onOpen, onClose }: Props): JSX.Element {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const isImageOk = failedImageUrl !== article.image_url

  function handleToggle(): void {
    if (isOpen) {
      onClose()
      return
    }
    onOpen(article)
  }

  function handleReadMoreClick(event: MouseEvent<HTMLButtonElement>): void {

    event.stopPropagation()
    handleToggle()
  }

  return (
    <Card className={styles.card} elevation={1} onClick={handleToggle}>
      <div className={styles.cardMedia}>
        {article.image_url && isImageOk ? (
          <img
            src={article.image_url}
            alt={article.title}
            onError={() => setFailedImageUrl(article.image_url)}
          />
        ) : (
          <span className={styles.cardMediaFallback}>No image</span>
        )}
      </div>

      <CardContent className={styles.content}>
        <Typography variant="subtitle1" component="h2" className={styles.title}>
          <HighlightText text={article.title} keywords={keywords} />
        </Typography>

        <Typography variant="body2" color="text.secondary" className={styles.summary}>
          <HighlightText text={truncate(article.summary, 100)} keywords={keywords} />
        </Typography>
      </CardContent>

      <CardActions className={styles.actions}>
        <Button
          variant="text"
          disableRipple
          onClick={handleReadMoreClick}
          className={styles.readMore}
          sx={{ all: 'unset', color: '#000', fontSize: 14, textTransform: 'none', cursor: 'pointer' }}
        >
          {isOpen ? '← Back to homepage' : 'Read more →'}
        </Button>
      </CardActions>

      {isOpen && (
        <div className={styles.modalRoot}>
          <div className={styles.modalPanel}>
            <Typography variant="body1" className={styles.modalTitle}>
              <HighlightText text={article.title} keywords={keywords} />
            </Typography>

            <Typography variant="body2" className={styles.modalText}>
              <HighlightText text={article.summary} keywords={keywords} />
            </Typography>
          </div>
        </div>
      )}
    </Card>
  )
}


