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

export const UpcomingNextSeason = (): JSX.Element => {
  const { isLoading, error, data } = usePopularThisSeasonAndUpcomingQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    season: MediaSeason.Fall,
    seasonYear: 2023
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const upcomingNextSeason = data?.Page?.media
  const upcomingNextSeasonSlice = upcomingNextSeason?.slice(0, 5)

  return <><ListName>UPCOMING NEXT SEASON<ViewAll>View All</ViewAll></ListName>
        <AnimeSection>
            {upcomingNextSeasonSlice?.map(item => <>
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
