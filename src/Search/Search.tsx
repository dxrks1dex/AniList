import React, { type JSX } from 'react'
import { SearchByName } from './SearchByName'
import { SearchByGenre } from './SearchByGenre'
// import { SearchResult } from './SearchResult'
import { SearchBar } from './searchStyle'
import { SearchByYear } from './SearchByYear'
import { SearchBySeason } from './SearchBySeason'
import { useOperationWithSearch } from './operationWithSearch'

export const Searcher = (): JSX.Element => {
  const {
    deleteGenreByIndex,
    deleteTagByIndex,
    deleteTagAndGenre,
    handleGenreFound,
    handleSeasonFound,
    handleNameFound,
    genreArr,
    handleTagAddToArr,
    handleGenreAddToArr,
    tag,
    tagArr,
    handleTagFound,
    handleYearFound,
    year,
    season,
    genreOrTag,
    foundByName
  } = useOperationWithSearch()

  return <><SearchBar>
      <SearchByName foundByName={foundByName} animeNameValue={handleNameFound}/>
      <SearchByGenre
          genreOrTagValue={handleGenreFound}
          genreOrTag={genreOrTag}
          tags={tag}
          tagValue={handleTagFound}
          genreArr={genreArr}
          handleGenreArr={handleGenreAddToArr}
          tagArr={tagArr}
          handleTagArr = {handleTagAddToArr}
          deleteGenreByIndex={deleteGenreByIndex}
          deleteTagByIndex={deleteTagByIndex}
          deleteTagAndGenre={deleteTagAndGenre}
      />
      <SearchByYear yearValue={handleYearFound} year={year}/>
    <SearchBySeason seasonValue={handleSeasonFound} season={season}/>
    </SearchBar>

     {/* <SearchResult */}
     {/*   tagArr={tagArr} */}
     {/*   genreArr={genreArr} */}
     {/*   genreOrTag={ genreOrTag } */}
     {/*   foundByName={ foundByName } */}
     {/*   tags = {tag} */}
     {/*   year = {year} */}
     {/*   animeNameValue={handleNameFound} */}
     {/*   season={season} */}
     {/* ></SearchResult> */}
    </>
}
