import React, { type JSX, useCallback, useMemo, useRef, useState } from 'react'
import { AnimeCard } from '../../components/AnimeCard'
import { useSearchResultQuery } from '../../anilist.g'
import { SearchResultGrid } from '../../Search/searchStyleComponents/searchResultComponentStyle'
import { MediaSort } from '../../gqlTypes.g'
import { Title } from '../../components/common/queryTitleStyle'
import { ContentContainer } from '../../components/common/bodyStyle'
import { Searcher } from '../../Search/Search'
import { useSearchContext } from '../../Search/hooks/SearchContext'
import { usePaginateData } from '../../hooks/common/usePaginateData'
import { isElementAtBottomOfPage } from '../../utilits/dom/isElementAtBottomOfPage'
import { useScrollListener } from '../../hooks/dom/useScrollListener'

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

  const scrollHandler = useCallback((e: Event) => {
    if (isElementAtBottomOfPage() && !isFetchingRef.current) {
      setCurrentPage(prevPage => prevPage + 1)
    }
  }, [])

  useScrollListener(scrollHandler)

  const paginatedItemsPrepared = useMemo(() => paginatedData?.filter(Boolean) as Array<NonNullable<typeof paginatedData[number]>>, [paginatedData])

  if (isLoading) return <>Loading...</>

  if (error) return <>An error has occurred: {(error as Error).message}</>

  return <ContentContainer>
    <Title>TRENDING ANIME</Title>
    <Searcher/>
        <SearchResultGrid>
          {paginatedItemsPrepared?.map(item => <AnimeCard key={item.id} {...item} />)}
          {isFetching ? <>Loading...</> : null}
        </SearchResultGrid>
    </ContentContainer>
}
