import {
  AnimeComponentStyle,
  AnimeImage,
  AnimeSection,
  AnimeTitleStyle,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { usePopularThisSeasonAndUpcomingQuery } from '../anilist.g'
import { MediaSeason } from '../gqlTypes.g'
import { NavLink } from 'react-router-dom'

export const PopularThisSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    season: MediaSeason.Summer,
    seasonYear: 2023
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const popularThisSeason = data?.Page?.media
  const popularThisSeasonSlice = popularThisSeason?.slice(0, 5)

  return <><NavLink to='anime/this-season'><ListName>POPULAR THIS SEASON <ViewAll>View All</ViewAll></ListName></NavLink>
        <AnimeSection>
            {popularThisSeasonSlice?.map(item => <>
                    <AnimeComponentStyle hoverColor={item?.coverImage?.color}>
                      {item?.coverImage?.extraLarge && <AnimeImage src={item?.coverImage?.extraLarge}/>}
                        <div style={{ cursor: 'pointer' }}>
                            <AnimeTitleStyle>
                                {item?.title?.romaji}
                            </AnimeTitleStyle>
                        </div>
                    </AnimeComponentStyle>
                </>
            )}
        </AnimeSection>
    </>
}
