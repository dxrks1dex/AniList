import React, { type JSX, useState } from 'react'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyle'
import { useGenreAndTagCollectionQuery } from '../anilist.g'
import { GenreOrTagStyleList, GenresOrTags, GenreTagTitleStyle } from './genreOrTagStyleComponent'

export const SearchByGenre = ({ genreOrTagValue, genreOrTag }: any): JSX.Element => {
  const [genreList, setGenreList] = useState(false)

  const { isLoading, error, data } = useGenreAndTagCollectionQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const genreByInput = data?.GenreCollection?.filter(genre =>
    genre?.slice(0, genreOrTag.length) === genreOrTag)
  const tagByInput = data?.MediaTagCollection?.filter(tag =>
    tag?.name.slice(0, genreOrTag.length) === genreOrTag)

  const handleGenreFound = (event: any): any => {
    genreOrTagValue(event.target.value) //! ! РЕНЕЙМНУТЬ
  }
  const handleGenreClear = (): any => {
    genreOrTagValue('') //! ! РЕНЕЙМНУТЬ
  }

  const handleGenreChoice = (genre: any): any => {
    genreOrTagValue(genre)
  }
  const handleTagChoice = (tag: any): any => {
    genreOrTagValue(tag)
  }

  return <div><SearchSectionName>Genre</SearchSectionName>
        <SearchSection onClick={() => { setGenreList(!genreList) }}>
            <SearchInput value={genreOrTag} placeholder='Any' onChange={ handleGenreFound }/>
            {genreOrTag !== ''
              ? <SearchButton onClick={(e: any) => {
                handleGenreClear()
                setGenreList(false)
                e.preventDefault()
              }}>X</SearchButton>
              : null
            }
        </SearchSection>
  { genreList
    ? <GenreOrTagStyleList>
          <>
              <GenreTagTitleStyle>GENRES</GenreTagTitleStyle>
          {genreByInput?.map(genre =>
          // eslint-disable-next-line react/jsx-key
            <GenresOrTags onClick = {() =>
              handleGenreChoice(genre)
            }>{genre}</GenresOrTags>)}</>
          <>
              <GenreTagTitleStyle>TAGS</GenreTagTitleStyle>
              {tagByInput?.map(tag =>
                  // eslint-disable-next-line react/jsx-key
                  <GenresOrTags onClick = {() =>
                    handleTagChoice(tag?.name)
                  }>{tag?.name}</GenresOrTags>)}
          </>
      </GenreOrTagStyleList>
    : <></> }</div>
}

// import React, { type JSX, useState } from 'react'
// import { SearchBar, SearchButton, SearchInput, SearchSection } from './searchStyle'
// import { useGenreAndTagCollectionQuery } from '../anilist.g'

// export const SearchByGenre = (): JSX.Element => {
//   const [foundByGenre, setFoundByGenre] = useState('')
//   const [genreList, setGenreList] = useState(false)
//
//   const { isLoading, error, data } = useGenreAndTagCollectionQuery({
//     endpoint: 'https://graphql.anilist.co',
//     fetchParams: { headers: { 'content-type': 'application/json' } }
//   })
//
//   if (isLoading) return <>Loading...</>
//   if (error) return <>An error has occurred: {(error as Error).message}</>
//
//   const onGenreFound = (e: any): any => { setFoundByGenre(e.target.value) }
//
//   const genreByInput = data?.GenreCollection?.filter(genre => genre?.slice(0, foundByGenre.length) === foundByGenre)
//   const tagByInput = data?.MediaTagCollection?.filter(tag => tag?.name.slice(0, foundByGenre.length) === foundByGenre)
//
//   return <><SearchBar>
//         Genre
//         <SearchSection onClick={() => { setGenreList(true) }}>
//             <SearchInput placeholder='Any' value={foundByGenre} onInput={onGenreFound}/>
//             {foundByGenre !== ''
//               ? <SearchButton onClick={(e: any) => {
//                 setFoundByGenre('')
//                 setGenreList(false)
//                 e.preventDefault()
//               }}>X</SearchButton>
//               : null
//             }
//         </SearchSection>
//     </SearchBar>
//   { genreList
//     ? <>
//           <>Genres
//           {genreByInput?.map(genre =>
//           // eslint-disable-next-line react/jsx-key
//             <section>{genre}</section>)}</>
//           <>Tags
//               {tagByInput?.map(tag =>
//                   // eslint-disable-next-line react/jsx-key
//                   <section>{tag?.name}</section>)}
//           </>
//       </>
//     : <></> }</>
// }
