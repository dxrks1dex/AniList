import React, { type JSX } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TrendingNow } from './TrendingNow/trendingnow'
import { AllTimePopular } from './TrendingNow/allTimePopular'
import { Top100Anime } from './Top100/top100'
import { InformationBlock } from './DiscriptoinCard/discription'
import { PopularThisSeason } from './TrendingNow/popularThisSeason'
import { UpcomingNextSeason } from './TrendingNow/upcomingNextSeason'
import { BodyStyle, ContentContainer } from './components/common/bodyStyle'
import { Searcher } from './Search/Search'
import { Outlet } from 'react-router-dom'
import { FooterDescription, FooterStyle, SiteTheme, TextContainer } from './components/common/footerStyle'
import { SearchContextWrapper } from './Search/hooks/SearchContext'

const queryClient = new QueryClient()

function App (): JSX.Element {
  return <BodyStyle>
      <header></header>
      <InformationBlock/>
      <QueryClientProvider client={queryClient}>
      <SearchContextWrapper><Outlet></Outlet></SearchContextWrapper>
      </QueryClientProvider>

      <FooterStyle>
          <TextContainer>
              <SiteTheme>Site Theme</SiteTheme>
              <FooterDescription>Donate</FooterDescription>
          </TextContainer>
      </FooterStyle>
  </BodyStyle>
}

export default App

export const Example = (): JSX.Element => {
  return (<>
          <ContentContainer>
                      <Searcher/>
              <TrendingNow/>
              <PopularThisSeason/>
              <UpcomingNextSeason/>
              <AllTimePopular/>
              <Top100Anime/>
          </ContentContainer>
   </>
  )
}
