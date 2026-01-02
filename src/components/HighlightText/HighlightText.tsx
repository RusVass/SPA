import type { JSX } from 'react'

import { splitToHighlightParts } from '../../features/articles/articles.search'
import styles from './HighlightText.module.scss'

type Props = {
  text: string
  keywords: string[]
}

export const HighlightText = ({ text, keywords }: Props): JSX.Element => {
  const parts = splitToHighlightParts(text, keywords)

  return (
    <>
      {parts.map((part, index) =>
        part.isHit ? (
          <mark key={index} className={styles.hit}>
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  )
}

