import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { useTrendingNowQuery } from '../anilist.g'
import { NavLink } from 'react-router-dom'
import { AnimeCard } from '../components/AnimeCard'

export const TrendingNow = (): JSX.Element => {
  const { isLoading, error, data } = useTrendingNowQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const trendingArr = data?.Page?.media
  const trendingSplice = trendingArr?.slice(0, 5) as Array<NonNullable<typeof trendingArr[number]>>

  return <><NavLink to='anime/trending'><ListName>TRENDING NOW <ViewAll>View All</ViewAll></ListName></NavLink>
    <AnimeSection>
        {trendingSplice?.map(item => <AnimeCard key={item?.id} {...item} />)}
    </AnimeSection>
</>
}
