import React, { type JSX } from 'react'
import { useAllTimePopularQuery } from '../anilist.g'
import {
  AnimeComponentStyle,
  AnimeImage,
  AnimeSection,
  AnimeTitleStyle,
  ListName,
  ViewAll
} from './animeComponentTrendingNow'

export const AllTimePopular = (): JSX.Element => {
  const { isLoading, error, data } = useAllTimePopularQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const allTimePopularArr = data?.Page?.media
  const allTimePopularSlice = allTimePopularArr?.slice(0, 5)

  return <><ListName>ALL TIME POPULAR <ViewAll>View All</ViewAll></ListName>
        <AnimeSection>
            {allTimePopularSlice?.map(item => <>
                    <AnimeComponentStyle hoverColor={item?.coverImage?.color}>
                      {item?.coverImage?.extraLarge && <AnimeImage src = {item?.coverImage?.extraLarge}/>}
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
