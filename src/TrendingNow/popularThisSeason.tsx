import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { usePopularThisSeasonAndUpcomingQuery } from '../anilist.g'
import { MediaSeason } from '../gqlTypes.g'
import { NavLink } from 'react-router-dom'
import { AnimeCard } from '../components/AnimeCard'

export const PopularThisSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    season: MediaSeason.Fall,
    seasonYear: 2023
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const popularThisSeason = data?.Page?.media
  const popularThisSeasonSlice = popularThisSeason?.slice(0, 5) as Array<NonNullable<typeof popularThisSeason[number]>>

  return <><NavLink to='anime/this-season'><ListName>POPULAR THIS SEASON <ViewAll>View All</ViewAll></ListName></NavLink>
        <AnimeSection>
            {popularThisSeasonSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
