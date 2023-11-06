import React, { type ChangeEvent, type JSX, useRef, useState } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { GenreOrTagStyleList } from './searchStyleComponents/genreOrTagStyleComponent'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyleComponents/searchStyle'
import { useSearchContext } from './hooks/SearchContext'
import { SelectOption } from './searchFunctions/SelectOption'
import { getSearchInputPlaceholder } from './searchFunctions/GetSearchInputPlaceholder'
import { doubleDelete } from './searchFunctions/doubleDelete'
import { useOutsideDetect } from '../hooks/common/useOutsideDetect'

export const SearchByYear = (): JSX.Element => {
  const [yearList, setYearList] = useState(false)
  const [searchYear, setSearchYear] = useState('')

  const { data: { year }, operations: { setYear, clearYear } } = useSearchContext()

  const wrapperRef = useRef(null)
  useOutsideDetect(wrapperRef, setYearList)

  const { isLoading, error, data } = useSearchResultQuery(
    {
      endpoint: 'https://graphql.anilist.co',
      fetchParams: { headers: { 'content-type': 'application/json' } }
    }
  )
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const yearSortByNumber = data?.Page?.media?.sort((a: any, b: any): any =>
    b?.startDate?.year - a?.startDate?.year)
  const yearArray = yearSortByNumber?.map(years => years?.startDate?.year?.toString())

  const yearByInput = doubleDelete(yearArray)?.filter(mediaYear =>
    mediaYear?.slice(0, searchYear.length) === searchYear)

  const onYearClick = (mediaYear: string | undefined): void => {
    if (mediaYear === undefined) {
      return
    }
    if (mediaYear === year) {
      clearYear()
    } else {
      setYear(mediaYear)
    }
    console.log(searchYear)
  }

  const isYearSelected = (mediaYear: string | undefined): boolean => {
    if (mediaYear === undefined) {
      return false
    }
    return year.includes(mediaYear)
  }

  return <div><SearchSectionName>Year</SearchSectionName>
      <SearchSection onClick={() => { setYearList(true) }}>
          <SearchInput value={searchYear}
                       placeholder={getSearchInputPlaceholder({ values: year })}
                       onChange={ (e: ChangeEvent<HTMLInputElement>) => { setSearchYear(e.target.value) }}/>
        {year === ''
          ? null
          : <SearchButton onClick={(e: any) => {
            clearYear()
            setYearList(false)
            e.preventDefault()
          }}>X</SearchButton>
        }
      </SearchSection>
      { yearList
        ? <GenreOrTagStyleList ref={wrapperRef}>
              <>
                  {yearByInput?.map((mediaYear) =>
                      <SelectOption key={mediaYear}
                                    value={mediaYear}
                                    onClick = {() => { onYearClick(mediaYear ?? '') }}
                                    selected={isYearSelected(mediaYear ?? '')}
                      >{mediaYear}</SelectOption>)}</>
          </GenreOrTagStyleList>
        : <></> }</div>
}
