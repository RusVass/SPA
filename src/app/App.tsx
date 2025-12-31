import { RouterProvider } from 'react-router-dom'

import { ArticlesProvider } from '../features/articles/articles.store'
import { router } from './router'

export default function App(): JSX.Element {
  return (
    <ArticlesProvider>
      <RouterProvider router={router} />
    </ArticlesProvider>
  )
}

