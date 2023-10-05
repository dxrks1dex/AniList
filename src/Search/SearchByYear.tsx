import React, { type JSX, useState } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { GenreOrTagStyleList, GenresOrTags } from './genreOrTagStyleComponent'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyle'

export const SearchByYear = ({ year, yearValue }: any): JSX.Element => {
  const [yearList, setYearList] = useState(false)
  const { isLoading, error, data } = useSearchResultQuery(
    {
      endpoint: 'https://graphql.anilist.co',
      fetchParams: { headers: { 'content-type': 'application/json' } }
    }
  )
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const yearSortByYear = data?.Page?.media?.sort((a: any, b: any): any =>
    b?.startDate?.year - a?.startDate?.year)
  const yearArray = yearSortByYear?.map(years => years?.startDate?.year?.toString())
  const yearFilterOnDouble = yearArray?.filter((mediaYear, index) =>
    yearArray?.indexOf(mediaYear) === index
  )
  const yearByInput = yearFilterOnDouble?.filter(mediaYear =>
    mediaYear?.slice(0, year) === year)

  const handleYearFound = (e: any): any => {
    yearValue(e.target.value)
  }
  const handleYearChoice = (year: string | null | undefined): any => {
    yearValue(year)
  }
  const handleYearClear = (): any => {
    yearValue('')
  }

  return <div><SearchSectionName>Year</SearchSectionName>
      <SearchSection onClick={() => { setYearList(!yearList) }}>
          <SearchInput value={year} placeholder='Any' onChange={ handleYearFound }/>
          {year !== ''
            ? <SearchButton onClick={(e: any) => {
              handleYearClear()
              setYearList(true)
              e.preventDefault()
            }}>X</SearchButton>
            : null
          }
      </SearchSection>
      { yearList
        ? <GenreOrTagStyleList>
              <>
                  {yearByInput?.map(year =>
                      // eslint-disable-next-line react/jsx-key
                      <GenresOrTags onClick = {() =>
                        handleYearChoice(year)
                      }>{year}</GenresOrTags>)}</>
          </GenreOrTagStyleList>
        : <></> }</div>
}
