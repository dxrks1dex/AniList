import React, { type JSX } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TrendingNow } from './TrendingNow/trendingnow'
import { AllTimePopular } from './TrendingNow/allTimePopular'
import { Top100Anime } from './Top100/top100'
import { InformationBlock } from './DiscriptoinCard/discription'
import { PopularThisSeason } from './TrendingNow/popularThisSeason'
import { UpcomingNextSeason } from './TrendingNow/upcomingNextSeason'
import { BodyStyle } from './global/bodyStyle'
import { Footer, FooterDescription, SiteTheme, TextContainer } from './global/footer'
import { Searcher } from './Search/search'
const queryClient = new QueryClient()

function App (): JSX.Element {
  return <>
     <QueryClientProvider client={queryClient}>
         <Example/>
     </QueryClientProvider>
      <Footer>
          <TextContainer>
              <SiteTheme>Site Theme</SiteTheme>
              <FooterDescription>Donate</FooterDescription>
          </TextContainer>
      </Footer>

  </>
}

export default App

export const Example = (): JSX.Element => {
  return (< BodyStyle >
      <InformationBlock/>
          <Searcher/>
      <TrendingNow/>
      <PopularThisSeason/>
      <UpcomingNextSeason/>
      <AllTimePopular/>
      <Top100Anime/>
   </BodyStyle>
  )
}
