import React, { type JSX, useCallback, useRef, useState } from 'react'
import { useSearchResultQuery } from '../../anilist.g'
import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../../TrendingNow/animeComponentTrendingNow'
import { SearchResultGrid } from '../../Search/searchStyleComponents/searchResultComponentStyle'
import { MediaSort } from '../../gqlTypes.g'
import { Title } from '../../components/common/queryTitleStyle'
import { ContentContainer } from '../../components/common/bodyStyle'
import { Searcher } from '../../Search/Search'
import { useSearchContext } from '../../Search/hooks/SearchContext'
import { usePaginateData } from '../../hooks/common/usePaginateData'
import { isElementAtBottomOfPage } from '../../utilits/dom/isElementAtBottomOfPage'
import { useScrollListener } from '../../hooks/dom/useScrollListener'
import { SortParams } from '../sortParams'
import { Link } from 'react-router-dom'
import { TitlePage } from './TitlePage'

export const TrendingNow = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data: { tags, season, year, genres, search } } = useSearchContext()

  const { isLoading, error, data, isFetching } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    sort: search === '' ? SortParams() : MediaSort.SearchMatch,
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

  const scrollHandler = useCallback((e: MouseEvent) => {
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
            <Link key={item?.title?.romaji} to={`/anime/${item?.title?.romaji ?? ''}/titleId`} onClick={() => TitlePage({
              titleImage: item?.coverImage?.extraLarge,
              titleColor: item?.coverImage?.color,
              titleName: item?.title?.romaji
            })}>
                    <AnimeComponentStyle hoverColor={item?.coverImage?.color}>
                        {item?.coverImage?.extraLarge && <AnimeImage src = {item.coverImage.extraLarge}/>}
                        <div style={{ cursor: 'pointer' }}>
                            <AnimeTitleStyle>
                                {item?.title?.romaji}
                            </AnimeTitleStyle>
                        </div>
                    </AnimeComponentStyle>
            </Link>
                </>
          )}
          {isFetching ? <>Loading...</> : null}
        </SearchResultGrid>
    </ContentContainer>
}
