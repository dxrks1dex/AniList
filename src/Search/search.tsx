import React, { type JSX, useState } from 'react'
import { useAllTimePopularQuery } from '../anilist.g'
import { AnimeComponentStyle, AnimeImage, AnimeSection, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'

export const Searcher = (): JSX.Element => {
  const [found, setFound] = useState(' ')

  const { isLoading, error, data } = useAllTimePopularQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const inputVal = found

  const titleLists = data?.Page?.media?.filter(name => name?.title?.romaji === inputVal)

  return <><input onChange={(e) => { setFound(e.target.value) }}/>
    <AnimeSection>
  {titleLists?.map((item) => <>
            <AnimeComponentStyle color={item?.coverImage?.color}>
              <AnimeImage src = {item?.coverImage?.extraLarge}/>
              <div style={{ cursor: 'pointer' }}>
                <AnimeTitleStyle>
                  {item?.title?.romaji}
                </AnimeTitleStyle>
              </div>
            </AnimeComponentStyle>
          </>
  )}</AnimeSection></>
}
