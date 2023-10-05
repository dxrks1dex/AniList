import React, { type JSX, useState } from 'react'
import { useSearchResultQuery } from '../anilist.g'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyle'
import { GenreOrTagStyleList, GenresOrTags } from './genreOrTagStyleComponent'

export const SearchBySeason = ({ season, seasonValue }: any): JSX.Element => {
  const [seasonList, setSeasonList] = useState(false)
  const { isLoading, error, data } = useSearchResultQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  }
  )
  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const seasonArr = data?.Page?.media?.map(mediaSeason => mediaSeason?.season)
  const seasonSort = seasonArr?.sort()
  const seasonFilter = seasonSort?.filter((mediaSeason, index) =>
    seasonSort?.indexOf(mediaSeason) === index)
  const seasonListByInput = seasonFilter?.filter(mediaSeason =>
    mediaSeason?.slice(0, season.length) === season)

  const handleSeasonClear = (): any => {
    seasonValue('')
  }
  const handleSeasonChoice = (season: string | null | undefined): any => {
    seasonValue(season)
  }

  return <div><SearchSectionName>Season</SearchSectionName>
        <SearchSection onClick={() => { setSeasonList(!seasonList) }}>
          {/* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */}
            <SearchInput value={season.slice(0, 1) + season.slice(1, season.length).toLowerCase()} placeholder='Any'/>
            {season !== ''
              ? <SearchButton onClick={(e: any) => {
                handleSeasonClear()
                setSeasonList(true)
                e.preventDefault()
              }}>X</SearchButton>
              : null
            }
        </SearchSection>
        { seasonList
          ? <GenreOrTagStyleList>
                <>
                    {seasonListByInput?.map(season =>
                        // eslint-disable-next-line react/jsx-key
                        <GenresOrTags onClick = {() =>
                          handleSeasonChoice(season)
                        }>{season?.slice(0, 1)}{season?.slice(1, season.length).toLowerCase()}</GenresOrTags>)}</>
            </GenreOrTagStyleList>
          : <></> }</div>
}
