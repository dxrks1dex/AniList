import {
  AnimeComponentStyle,
  AnimeImage,
  AnimeSection,
  AnimeTitleStyle,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { useTrendingNowQuery } from '../anilist.g'

export const TrendingNow = (): JSX.Element => {
  const { isLoading, error, data } = useTrendingNowQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  const trendingArr = data?.Page?.media
  const trendingSplice = trendingArr?.slice(0, 5)

  return <><ListName>TRENDING NOW <ViewAll>View All</ViewAll></ListName>
    <AnimeSection>
        {trendingSplice?.map(item => <>
                <AnimeComponentStyle color={item?.coverImage?.color}>
                  {item?.coverImage?.extraLarge && <AnimeImage src = {item.coverImage.extraLarge}/>}
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
