import { createBrowserRouter } from 'react-router-dom'
import { TrendingNow } from './pages/TrendingNow'
import App, { Example } from '../App'

import React from 'react'
import { NotFoundPage } from '../components/common/NotFoundPage'
import { TitlePage } from './pages/TitlePage'
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
        path: '/anime/:sort',
        element: <>
            < TrendingNow/>
        </>
      },
      {
        path: '/anime/:id/:name',
        element: <>
          <TitlePage/>
        </>
      }
    ]
  }])
