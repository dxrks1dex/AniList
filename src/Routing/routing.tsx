import { createBrowserRouter } from 'react-router-dom'
import { AnimePage } from './pages/AnimePage'
import { TrendingNow } from './pages/TrendingNow'
import App, { Example } from '../App'

import React from 'react'
import { NotFoundPage } from '../components/common/NotFoundPage'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <Example/>
      },
      {
        path: '/anime/:sort',
        element: <>
            < TrendingNow/>
        </>
      },
      {
        path: '/anime/:id/:name',
        element: <AnimePage />
      }
    ]
  }])
