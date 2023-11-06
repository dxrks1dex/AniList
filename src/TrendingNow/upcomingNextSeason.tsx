import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { usePopularThisSeasonAndUpcomingQuery } from '../anilist.g'
import { MediaSeason } from '../gqlTypes.g'
import { AnimeCard } from '../components/AnimeCard'
import { NavLink } from 'react-router-dom'

export const UpcomingNextSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    season: MediaSeason.Winter,
    seasonYear: 2024
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const upcomingNextSeason = data?.Page?.media
  const upcomingNextSeasonSlice = upcomingNextSeason?.slice(0, 5) as Array<NonNullable<typeof upcomingNextSeason[number]>>

  return <><NavLink to={'anime/next-season'}><ListName>UPCOMING NEXT SEASON<ViewAll>View All</ViewAll></ListName></NavLink>
        <AnimeSection>
            {upcomingNextSeasonSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
