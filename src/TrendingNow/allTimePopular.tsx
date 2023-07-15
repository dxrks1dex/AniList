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
  }, {
    page: 1
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const allTimePopularArr = data?.Page?.media
  const allTimePopularSplice = allTimePopularArr?.slice(0, 5)

  return <><ListName>ALL TIME POPULAR <ViewAll>View All</ViewAll></ListName>
        <AnimeSection>
            {allTimePopularSplice?.map(item => <>
                    <AnimeComponentStyle color={item?.coverImage?.color}>
                        <AnimeImage src = {item?.coverImage?.large}/>
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
