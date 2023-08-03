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

  return <><ListName>POPULAR THIS SEASON <ViewAll>View All</ViewAll></ListName>
        <AnimeSection>
            {popularThisSeasonSlice?.map(item => <>
                    <AnimeComponentStyle color={item?.coverImage?.color}>
                        <AnimeImage src = {item?.coverImage?.extraLarge}/>
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
