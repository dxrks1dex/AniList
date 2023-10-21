import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'
import { SearchResultGrid } from '../Search/searchResultComponentStyle'
import { MediaSort } from '../gqlTypes.g'
import { Title } from '../global/queryTitleStyle'
import { ContentContainer } from '../global/bodyStyle'
import { Searcher } from '../Search/Search'
import { useSearchContext } from '../Search/SearchContext'
import { usePaginateData } from '../global/usePaginateData'
import { isElementAtBottomOfPage } from '../global/isElementAtBottomOfPage'
import { useScrollListener } from '../global/useScrollListener'

export const TrendingNow = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: { tags, season, year, genres, search } } = useSearchContext()

  const { isLoading, error, data, isFetching } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    sort: search === '' ? MediaSort.TrendingDesc : MediaSort.SearchMatch,
    page: currentPage,
    genre: genres.length === 0 ? undefined : genres,
    tag: tags.length === 0 ? undefined : tags,
    year: year === '' ? undefined : year + '%',
    season,
    search: search === '' ? undefined : search
  }, {
    keepPreviousData: true
  })

  const isFetchingRef = useRef(isFetching)
  isFetchingRef.current = isFetching

  const paginatedData = usePaginateData({
    data: data?.Page?.media,
    currentPage
  })

  const scrollHandler = useCallback((e) => {
    if (isElementAtBottomOfPage(e.target) && !isFetchingRef.current) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }, [])

  useScrollListener(scrollHandler)

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  return <ContentContainer>
    <Title>TRENDING ANIME</Title>
    <Searcher/>
        <SearchResultGrid>
          {paginatedData?.map(item => <>
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
    </ContentContainer>
}
