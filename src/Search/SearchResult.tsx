import { AnimeComponentStyle, AnimeImage, AnimeSection, AnimeTitleStyle } from '../TrendingNow/animeComponentTrendingNow'
import React, { type JSX } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { SearchArguments, StyledClose } from './searchStyleComponents/searchResoultStyleComponent'
import { SearchResultGrid } from './searchStyleComponents/searchResultComponentStyle'

export const SearchResult = ({ foundByName, year, genreArr, tagArr, season, animeNameValue }: any): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  const yearVal = year + '%'

  const { isLoading, error, data } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }, {
    genre: genreArr.length === 0 ? undefined : genreArr,
    tag: tagArr.length === 0 ? undefined : tagArr,
    year: yearVal === '' ? undefined : yearVal,
    season: season === '' ? undefined : season.toUpperCase()
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const titleListsBasedOnName = data?.Page?.media?.filter(mediaAnime =>
    mediaAnime?.title?.romaji?.slice(0, foundByName.length) === foundByName)
  // const titleListBasedOnGenre = titleListsBasedOnName?.filter(mediaAnime =>
  //   mediaAnime?.genres?.some(genre => genre === genreOrTag))

  // const animeBasedOnNameToFive = data?.Page?.media?.slice(0, 5)
  // const animeBasedOnNameToTen = data?.Page?.media?.slice(5, 10)

  const handleNameClear = (): any => {
    animeNameValue('')
  }

  return <>{foundByName === ''
    ? null
    : <SearchArguments onClick={() => handleNameClear()}>Search: {foundByName}<StyledClose/></SearchArguments>}
    <AnimeSection>
             {foundByName === '' && genreArr.length === 0 && tagArr.length === 0 && year === '' && season === ''
               ? <></>
               : <SearchResultGrid>{titleListsBasedOnName?.map((item) => <>
                       <AnimeComponentStyle
                           hoverColor={item?.coverImage?.color}
                       >
                         {item?.coverImage?.extraLarge && <AnimeImage src={item?.coverImage?.extraLarge}/>}
                         <div style={{ cursor: 'pointer' }}>
                           <AnimeTitleStyle>
                             {item?.title?.romaji}
                           </AnimeTitleStyle>
                         </div>
                       </AnimeComponentStyle>
                     </>
               )}
                 </SearchResultGrid>
             }
  </AnimeSection></>
}
