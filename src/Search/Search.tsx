import React, { type JSX, useState } from 'react'
import { SearchByName } from './SearchByName'
import { SearchByGenre } from './SearchByGenre'
import { SearchResult } from './SearchResult'
import { SearchBar } from './searchStyle'

export const Searcher = (): JSX.Element => {
  const [genreOrTag, setGenreOrTag] = useState('')
  const [foundByName, setFoundByName] = useState('')

  const handleGenreFound = (genreOrTag: string): any => {
    setGenreOrTag(genreOrTag)
  }
  const handleNameFound = (foundByName: string): any => {
    setFoundByName(foundByName)
  }

  return <><SearchBar>
      <SearchByName foundByName={foundByName} animeNameValue={handleNameFound}/>
      <SearchByGenre genreOrTagValue={handleGenreFound} genreOrTag={genreOrTag}/>
    </SearchBar>
    <SearchResult
        genreOrTag={ genreOrTag }
        foundByName={ foundByName }
        animeNameValue={handleNameFound}
    ></SearchResult>
    </>
}
