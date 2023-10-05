import { createBrowserRouter } from 'react-router-dom'
import { TrendingNow } from './TrendingNow'
import App from '../App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PopularThisSeason } from './PopularThisSeason'
import { Searcher } from '../Search/Search'
import { Title } from '../global/queryTitleStyle'
import { BodyStyle, ContentContainer } from '../global/bodyStyle'
import React from 'react'

const queryClient = new QueryClient()
export const routing = createBrowserRouter([
  {
    path: '/',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <App/>
  },
  {
    path: '/anime/trending',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <><BodyStyle>
      <ContentContainer>
        <Title>TRENDING ANIME</Title>
        <QueryClientProvider client={ queryClient }>
          <Searcher/>
          < TrendingNow />
        </QueryClientProvider>
      </ContentContainer>
    </BodyStyle></>
  },
  {
    path: '/anime/this-season',
    // eslint-disable-next-line react/react-in-jsx-scope
    element: <QueryClientProvider client={ queryClient }>< PopularThisSeason /></QueryClientProvider>
  }
])
