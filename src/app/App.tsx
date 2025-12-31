import { RouterProvider } from 'react-router-dom'
import type { ReactElement } from 'react'

import { ArticlesProvider } from '../features/articles/articles.store'
import { router } from './router'

export default function App(): ReactElement {
  return (
    <ArticlesProvider>
      <RouterProvider router={router} />
    </ArticlesProvider>
  )
}

