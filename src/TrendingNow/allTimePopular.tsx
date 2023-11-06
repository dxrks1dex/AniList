import React, { type JSX } from 'react'
import { useAllTimePopularQuery } from '../anilist.g'
import {
  AnimeSection,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import { AnimeCard } from '../components/AnimeCard'
import { NavLink } from 'react-router-dom'

export const AllTimePopular = (): JSX.Element => {
  const { isLoading, error, data } = useAllTimePopularQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const allTimePopularArr = data?.Page?.media
  const allTimePopularSlice = allTimePopularArr?.slice(0, 5) as Array<NonNullable<typeof allTimePopularArr[number]>>

  return <><NavLink to={'anime/all-time-popular'}><ListName>ALL TIME POPULAR <ViewAll>View All</ViewAll></ListName></NavLink>
        <AnimeSection>
            {allTimePopularSlice?.map(item => <AnimeCard key={item.id} {...item}/>)}
        </AnimeSection>
    </>
}
