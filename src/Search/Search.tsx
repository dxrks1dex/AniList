import React, { type JSX } from 'react'
import { SearchByName } from './SearchByName'
import { SearchByGenre } from './SearchByGenre'

import { SearchBar } from './searchStyleComponents/searchStyle'
import { SearchByYear } from './SearchByYear'
import { SearchBySeason } from './SearchBySeason'

export const Searcher = (): JSX.Element => {
  return <><SearchBar>
      <SearchByName/>
      <SearchByGenre/>
      <SearchByYear/>
      <SearchBySeason/>
    </SearchBar>

      {/* <SearchResult */}
      {/*  tagArr={tagArr} */}
      {/*  genreArr={genreArr} */}
      {/*  genreOrTag={ genreOrTag } */}
      {/*  foundByName={ foundByName } */}
      {/*  tags = {tag} */}
      {/*  year = {year} */}
      {/*  animeNameValue={handleNameFound} */}
      {/*  season={season} */}
      {/* ></SearchResult> */}
    </>
}
