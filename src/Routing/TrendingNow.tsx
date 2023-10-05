import React, { type JSX, useCallback, useEffect, useState } from 'react'
import { type TrendingNowQuery, useSearchResultQuery } from '../anilist.g'
import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'
import { SearchResultGrid } from '../Search/searchResultComponentStyle'
import { MediaSort } from '../gqlTypes.g'
import { useOperationWithSearch } from '../Search/operationWithSearch'

export const TrendingNow = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const {
    genreArr,
    tagArr,
    year,
    season,
    foundByName
  } = useOperationWithSearch()
  console.log(foundByName)

  const { isLoading, error, data, isFetching } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    sort: MediaSort.TrendingDesc,
    page: currentPage,
    genre: genreArr.length === 0 ? undefined : genreArr,
    tag: tagArr.length === 0 ? undefined : tagArr,
    year: year === '' ? undefined : year,
    season: season === '' ? undefined : season.toUpperCase()
  }, {
    keepPreviousData: true
  })

  const [trendingOutput, setTrendingOutput] = useState<TrendingNowQuery[] | object>([])

  const titleListsBasedOnName = trendingOutput.filter(mediaAnime =>
    mediaAnime?.title?.romaji?.slice(0, foundByName.length) === foundByName)

  useEffect(() => {
    if (data?.Page?.media !== undefined) {
      setTrendingOutput(trendingOutput => ([...trendingOutput, ...data?.Page?.media]))
    }
  }, [data?.Page?.media])

  const scrollHandler = useCallback((e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      if (!isFetching) {
        setCurrentPage(prevPage => prevPage + 1)
      }
    }
  }, [isFetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [scrollHandler])

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  return <>
        <SearchResultGrid>
          {titleListsBasedOnName?.map(item => <>
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
    </>
}
