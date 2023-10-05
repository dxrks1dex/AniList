
import React, { type JSX, useEffect, useState } from 'react'
import { useTrendingNowQuery } from '../anilist.g'
import {
  AnimeImage,
  AnimeTitleStyle,
  ListName,
  AnimeComponentStyle
} from '../TrendingNow/animeComponentTrendingNow'
import { SearchResultGrid } from '../Search/searchResultComponentStyle'
import { BodyStyle } from '../global/bodyStyle'

export const PopularThisSeason = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)

  const { isLoading, error, data, isFetching } = useTrendingNowQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    page: currentPage
  }, {
    keepPreviousData: true
  })

  const trendingArr = data?.Page?.media
  console.log(trendingArr)

  const [trendingOutput, setTrendingOutput] = useState([])

  console.log(trendingOutput)

  useEffect(() => {
    if (data?.Page?.media !== undefined) {
      setTrendingOutput(trendingOutput => ([...trendingOutput, ...data?.Page?.media]))
    }
  }, [data?.Page?.media])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  const scrollHandler = (e): any => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      if (!isFetching) {
        setCurrentPage(prevPage => prevPage + 1)
      }
    }
  }

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  return <BodyStyle><ListName>TRENDING NOW</ListName>
        <SearchResultGrid>
            {trendingOutput?.map(item => <>
                    <AnimeComponentStyle hoverColor={item?.coverImage?.color}>
                        {item?.coverImage?.extraLarge && <AnimeImage src = {item.coverImage.extraLarge}/>}
                        <div style={{ cursor: 'pointer' }}>
                            <AnimeTitleStyle>
                                {item?.title?.romaji}
                            </AnimeTitleStyle>
                        </div>
                    </AnimeComponentStyle>
                </>
            )}
            {isFetching ? <>Loading...</> : null}
        </SearchResultGrid>
    </BodyStyle>
}
