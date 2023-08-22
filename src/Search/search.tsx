import React, { type JSX, useState } from 'react'
import { SearchByName } from './SearchByName'
import { SearchByGenre } from './SearchByGenre'
export const Searcher = (): JSX.Element => {
  const [genreOrTag, setGenreOrTag] = useState('')

  const handleGenreFound = (genreOrTag: string): any => {
    setGenreOrTag(genreOrTag)
  }

  return <>
    <SearchByName genreOrTag={ genreOrTag }/>
    <SearchByGenre genreOrTagValue={handleGenreFound} genreOrTag={genreOrTag}/>
    </>
}
