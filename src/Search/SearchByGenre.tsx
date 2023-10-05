import React, { type JSX, useState } from 'react'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyle'
import { useGenreAndTagCollectionQuery } from '../anilist.g'
import {
  GenreOrTagInInput,
  GenreOrTagStyleList,
  GenresOrTags,
  GenreTagTitleStyle
} from './genreOrTagStyleComponent'
import { StyledClose } from './searchResoultStyleComponent'

export const SearchByGenre = ({
  genreOrTagValue,
  genreOrTag,
  tags, tagValue,
  genreArr,
  handleGenreArr,
  tagArr,
  handleTagArr,
  deleteGenreByIndex,
  deleteTagByIndex,
  deleteTagAndGenre
}: any): JSX.Element => {
  const [genreList, setGenreList] = useState(false)

  const { isLoading, error, data } = useGenreAndTagCollectionQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const genreByInputArr = data?.GenreCollection?.filter(genre =>
    genre?.slice(0, genreOrTag.length) === genreOrTag)

  const tagAdultFilter = data?.MediaTagCollection?.filter(mediaTag =>
    mediaTag?.isAdult === false)
  const tagByInput = tagAdultFilter?.filter(tag =>
    tag?.name.slice(0, genreOrTag.length) === genreOrTag)

  const handleGenreFound = (event: any): any => {
    genreOrTagValue(event.target.value) //! ! РЕНЕЙМНУТЬ
  }
  const handleTagFound = (e: any): any => {
    tagValue(e.target.value)
  }
  const handleGenreAndTagClear = (): any => {
    genreOrTagValue('') //! ! РЕНЕЙМНУТЬ
    tagValue('')
    deleteTagAndGenre()
  }
  const handleGenreChoice = (genre: any): any => {
    genreOrTagValue(genre)
  }
  const handleTagChoice = (tag: any): any => {
    tagValue(tag)
  }
  const handleGenreAddToArr = (genre: any): any => {
    handleGenreArr(genre)
  }
  const handleTagAddToArr = (tag: any): any => {
    handleTagArr(tag)
  }
  const deleteGenreFromFoundByIndex = (genre: any): any => {
    deleteGenreByIndex(genre)
  }
  const deleteTagFromFoundByIndex = (tag: any): any => {
    deleteTagByIndex(tag)
  }
  return <div><SearchSectionName>Genre</SearchSectionName>
        <SearchSection onClick={() => { setGenreList(!genreList) }}>
          {/* eslint-disable-next-line react/jsx-key */}
            <SearchInput value={tags === '' ? genreOrTag : tags}
                         placeholder={genreArr.length === 0
                           ? 'Any'
                           : genreArr.length > 1
                             ? <>
                                 <GenreOrTagInInput>{genreArr[0]}</GenreOrTagInInput>
                                 <GenreOrTagInInput>+{genreArr.length}</GenreOrTagInInput>
                               </>
                             : genreArr.map((mediaGenre: any) =>
                             // eslint-disable-next-line react/jsx-key
                                   <GenreOrTagInInput>{mediaGenre}</GenreOrTagInInput>
                             )}
                         onChange={ tags === '' ? handleGenreFound : handleTagFound}
            />
            {genreOrTag !== ''
              ? <SearchButton onClick={(e: any) => {
                handleGenreAndTagClear()
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
          {genreByInputArr?.map(genre =>
            genreArr.some((mediaGenre: string | null) => mediaGenre === genre)
            // eslint-disable-next-line react/jsx-key
              ? <GenresOrTags onClick = {() => {
                deleteGenreFromFoundByIndex(genre)
              }
                }>{genre}<StyledClose/></GenresOrTags>
            // eslint-disable-next-line react/jsx-key
              : <GenresOrTags onClick = {() => {
                handleGenreChoice(genre)
                handleGenreAddToArr(genre)
              }
                }>{genre}</GenresOrTags>)}</>
          <>
              <GenreTagTitleStyle>TAGS</GenreTagTitleStyle>
              {tagByInput?.map(tag =>
                tagArr.some((mediaTag: string | null) => mediaTag === tag?.name)
                // eslint-disable-next-line react/jsx-key
                  ? <GenresOrTags onClick={() => {
                    deleteTagFromFoundByIndex(tag?.name)
                  }
                    }>{tag?.name}<StyledClose/></GenresOrTags>
                // eslint-disable-next-line react/jsx-key
                  : <GenresOrTags onClick = {() => {
                    handleTagChoice(tag?.name)
                    handleTagAddToArr(tag?.name)
                    console.log(tagArr)
                  }
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
