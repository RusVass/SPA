import { createBrowserRouter } from 'react-router-dom'

import { ArticlesPage } from '../pages/ArticlesPage/ArticlesPage'
import { ArticlePage } from '../pages/ArticlePage/ArticlePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ArticlesPage />,
  },
  {
    path: '/articles/:id',
    element: <ArticlePage />,
  },
])

