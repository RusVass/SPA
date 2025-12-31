import { createBrowserRouter } from 'react-router-dom'

import { HomePage } from '../pages/HomePage/HomePage'
import { ArticlePage } from '../pages/ArticlePage/ArticlePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/articles/:id',
    element: <ArticlePage />,
  },
])

