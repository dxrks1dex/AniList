// import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react'
// import { type TrendingNowQuery, useSearchResultQuery } from '../anilist.g'
// import { AnimeComponentStyle, AnimeImage, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'
// import { SearchResultGrid } from '../Search/searchResultComponentStyle'
// import { MediaSort } from '../gqlTypes.g'
// import { Title } from '../global/queryTitleStyle'
// import { ContentContainer } from '../global/bodyStyle'
// import { Searcher } from '../Search/Search'
// import { useSearchContext } from '../Search/SearchContext'
//
// type Media = NonNullable<NonNullable<TrendingNowQuery['Page']>['media']>
//
// export const PopularThisSeason = (): JSX.Element => {
//   const [currentPage, setCurrentPage] = useState(1)
//
//   const { data: { tags, season, year, genres, search } } = useSearchContext()
//
//   const { isLoading, error, data, isFetching } = useSearchResultQuery({
//     endpoint: 'https://graphql.anilist.co',
//     fetchParams: { headers: { 'content-type': 'application/json' } }
//   }, {
//     sort: MediaSort.PopularityDesc,
//     page: currentPage,
//     genre: genres.length === 0 ? undefined : genres,
//     tag: tags.length === 0 ? undefined : tags,
//     year: year === '' ? undefined : year + '%',
//     season,
//     search: search === '' ? undefined : search
//   }, {
//     keepPreviousData: true
//   })
//
//   const [popularOutput, setPopularOutput] = useState<Media>([])
//
//   const currentPageRef = useRef(currentPage)
//   currentPageRef.current = currentPage
//
//   const prevPageRef = useRef<number | undefined>(undefined)
//
//   useEffect(() => {
//     const prevPage = prevPageRef.current
//
//     if (prevPage !== undefined && prevPage >= currentPageRef.current) {
//       setPopularOutput(data?.Page?.media ?? [])
//     } else
//     if (data?.Page?.media !== undefined) {
//       setPopularOutput(trendingOutput => ([...trendingOutput, ...(data?.Page?.media ?? [])]))
//       prevPageRef.current = currentPageRef.current
//     }
//   }, [data?.Page?.media])
//
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [genres, tags, search, year, season])
//
//   const scrollHandler = useCallback((e) => {
//     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
//       if (!isFetching) {
//         console.log(typeof e.target)
//         setCurrentPage(prevPage => prevPage + 1)
//       }
//     }
//   }, [isFetching])
//
//   useEffect(() => {
//     document.addEventListener('scroll', scrollHandler)
//     return function () {
//       document.removeEventListener('scroll', scrollHandler)
//     }
//   }, [scrollHandler])
//
//   if (isLoading) return <>Loading...</>
//
//   if (error) return <>An error has occurred: {(error as Error).message}</>
//
//   return <ContentContainer>
//     <Title>TRENDING ANIME</Title>
//     <Searcher/>
//     <SearchResultGrid>
//       {popularOutput?.map(item => <>
//             <AnimeComponentStyle hoverColor={item?.coverImage?.color}>
//               {item?.coverImage?.extraLarge && <AnimeImage src = {item.coverImage.extraLarge}/>}
//               <div style={{ cursor: 'pointer' }}>
//                 <AnimeTitleStyle>
//                   {item?.title?.romaji}
//                 </AnimeTitleStyle>
//               </div>
//             </AnimeComponentStyle>
//           </>
//       )}
//       {isFetching ? <>Loading...</> : null}
//     </SearchResultGrid>
//   </ContentContainer>
// }
