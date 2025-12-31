import { useState, type JSX } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'

import type { Article } from '../../features/articles/articles.types'
import { truncate } from '../../features/articles/articles.utils'
import { HighlightText } from '../HighlightText/HighlightText'
import styles from './ArticleCard.module.scss'

interface Props {
  article: Article
  keywords: string[]
}

export function ArticleCard({ article, keywords }: Props): JSX.Element {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const isImageOk = failedImageUrl !== article.image_url

  return (
    <Card className={styles.card} elevation={1}>
      <CardActionArea component={RouterLink} to={`/articles/${article.id}`}>
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
          <Typography
            variant="body2"
            className={styles.readMore}
            sx={{ color: '#000', fontSize: 14, textTransform: 'none' }}
          >
            Read more →
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}


