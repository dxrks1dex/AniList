import React, { type JSX, useRef, useState } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyleComponents/searchStyle'
import { GenreOrTagStyleList } from './searchStyleComponents/genreOrTagStyleComponent'
import { useSearchContext } from './hooks/SearchContext'
import { type MediaSeason } from '../gqlTypes.g'
import { SelectOption } from './searchFunctions/SelectOption'
import { doubleDelete } from './searchFunctions/doubleDelete'
import { useOutsideDetect } from '../hooks/common/useOutsideDetect'

export const SearchBySeason = (): JSX.Element => {
  const [seasonList, setSeasonList] = useState(false)

  const { data: { season }, operations: { setSeason, clearSeason } } = useSearchContext()

  const wrapperRef = useRef(null)
  useOutsideDetect(wrapperRef, setSeasonList)

  const { isLoading, error, data } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }
  )
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const seasons = data?.Page?.media?.map(mediaSeason => mediaSeason?.season)
  const seasonSort = seasons?.sort()

  const onSeasonClick = (mediaSeason: MediaSeason | undefined): void => {
    if (mediaSeason === undefined) {
      return
    }
    if (isSeasonSelect(mediaSeason)) {
      clearSeason()
      return
    }
    setSeason(mediaSeason)
  }

  const isSeasonSelect = (mediaSeason: MediaSeason | undefined): boolean => {
    if (mediaSeason === undefined) {
      return false
    }
    if (season === undefined) {
      return false
    } else {
      return season?.includes(mediaSeason)
    }
  }
  const seasonToLowerCase = (): string => {
    if (season === undefined) {
      return ''
    }

    return season.slice(0, 1) + season.slice(1, season.length).toLowerCase()
  }

  return <div><SearchSectionName>Season</SearchSectionName>
        <SearchSection onClick={() => { setSeasonList(true) }}>
            <SearchInput value={seasonToLowerCase()} placeholder='Any'/>
            {season !== undefined
              ? <SearchButton onClick={(e: any) => {
                clearSeason()
                setSeasonList(true)
                e.preventDefault()
              }}>X</SearchButton>
              : null
            }
        </SearchSection>
        { seasonList
          ? <GenreOrTagStyleList ref={wrapperRef}>
                <>
                    {doubleDelete(seasonSort)?.map((mediaSeason) =>
                        <SelectOption
                            key={mediaSeason}
                            value={mediaSeason}
                            onClick = {() => { onSeasonClick(mediaSeason ?? undefined) }}
                            selected={isSeasonSelect(mediaSeason ?? undefined)}
                        />)}</>
            </GenreOrTagStyleList>
          : <></> }</div>
}
