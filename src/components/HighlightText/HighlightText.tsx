import type { JSX } from 'react'

import { splitToHighlightParts } from '../../features/articles/articles.search'
import styles from './HighlightText.module.scss'

type Props = {
  text: string
  keywords: string[]
}

export function HighlightText({ text, keywords }: Props): JSX.Element {
  const parts = splitToHighlightParts(text, keywords)

  return (
    <>
      {parts.map((p, idx) =>
        p.isHit ? (
          <mark key={idx} className={styles.hit}>
            {p.text}
          </mark>
        ) : (
          <span key={idx}>{p.text}</span>
        ),
      )}
    </>
  )
}

