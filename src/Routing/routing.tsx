import { createBrowserRouter } from 'react-router-dom'
import { TrendingNow } from './pages/TrendingNow'
import App, { Example } from '../App'

import React from 'react'
import { NotFoundPage } from '../components/common/NotFoundPage'
// import { PopularThisSeason } from './PopularThisSeason'

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
        path: '/anime/trending',
        element: <>
            < TrendingNow/>
        </>
      }
    ]
  }])
