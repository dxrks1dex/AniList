import React, { type ChangeEvent, type JSX, useEffect, useState } from 'react'
import { SearchButton, SearchInput, SearchSection, SearchSectionName } from './searchStyle'
import { useGenreAndTagCollectionQuery } from '../anilist.g'
import { GenreOrTagStyleList, GenreTagTitleStyle } from './genreOrTagStyleComponent'
import { useSearchContext } from './SearchContext'
import { getSearchInputPlaceholder } from './GetSearchInputPlaceholder'
import { SelectOption } from './SelectOption'
import { useSearchParams } from 'react-router-dom'

export const SearchByGenre = (): JSX.Element => {
  const [isGenreAndTagListOpen, setIsGenreAndTagListOpen] = useState(false)
  const [searchTagOrGenre, setSearchTagOrGenre] = useState('')
  const [searchParams] = useSearchParams()

  const { data: { genres, tags }, operations: { setGenres, setTags, addTagUrl, addGenreUrl, clearGenresAndTags, clearUrl } } = useSearchContext()

  useEffect(() => {
    if (genres.length > 0) {
      addGenreUrl()
    }
    if (tags.length > 0) {
      addTagUrl()
    }
  }, [addGenreUrl, addTagUrl, genres.length, tags.length])

  const { isLoading, error, data } = useGenreAndTagCollectionQuery({
    endpoint: 'https://graphql.anilist.co',
    fetchParams: { headers: { 'content-type': 'application/json' } }
  })

  if (isLoading) return <>Loading...</>
  if (error) return <>An error has occurred: {(error as Error).message}</>

  const genreFiltered = data?.GenreCollection?.filter((mediaGenre) =>
    mediaGenre?.slice(0, searchTagOrGenre.length) === searchTagOrGenre
  )

  const tagFiltered = data?.MediaTagCollection?.filter((mediaTag) =>
    mediaTag?.name.slice(0, searchTagOrGenre.length) === searchTagOrGenre
  )

  const onGenreClick = (mediaGenre: string | null): void => {
    if (mediaGenre === null) {
      return
    }
    if (isGenreSelected(mediaGenre)) {
      setGenres((prevState) => prevState?.filter((item) => item !== mediaGenre))
    } else {
      setGenres((prevState) => [...prevState, mediaGenre])
      addGenreUrl()
    }
  }
  const onTagClick = (mediaTag: string): void => {
    if (mediaTag === undefined || mediaTag === null) {
      return
    }
    if (isTagSelected(mediaTag)) {
      setTags((prevState) => prevState?.filter((item) => item !== mediaTag))
    } else {
      setTags((prevState) => [...prevState, mediaTag])
      addTagUrl()
    }
  }

  const isGenreSelected = (mediaGenre: string | null): boolean => {
    if (mediaGenre === null) {
      return false
    }
    return genres.includes(mediaGenre)
  }

  const isTagSelected = (mediaTag: string): boolean => {
    if (mediaTag === undefined || null) {
      return false
    }
    return tags.includes(mediaTag)
  }

  // useEffect(() => {
  //   const urlParamsGenre = searchParams.get('genre')
  //
  //   if (urlParamsGenre !== null) {
  //     const isUrlInclude = genres.includes(urlParamsGenre)
  //     if (isUrlInclude) {
  //       setGenres((prevState) => [...prevState, urlParamsGenre])
  //     }
  //   }
  // }, [genres, searchParams, setGenres])

  return <div><SearchSectionName>Genre</SearchSectionName>
        <SearchSection onClick={() => { setIsGenreAndTagListOpen(!isGenreAndTagListOpen) }}>
            <SearchInput value={searchTagOrGenre}
                         placeholder={getSearchInputPlaceholder({ values: [...genres, ...tags] })}
                         onChange={(e: ChangeEvent<HTMLInputElement>) => { setSearchTagOrGenre(e.target.value) }}
            />
            {genres.length === 0 && tags.length === 0
              ? null
              : <SearchButton onClick={(e: any) => {
                clearGenresAndTags()
                setIsGenreAndTagListOpen(false)
                e.preventDefault()
                clearUrl()
              }}>X</SearchButton>
            }
        </SearchSection>
  { isGenreAndTagListOpen
    ? <GenreOrTagStyleList>
              <GenreTagTitleStyle>GENRES</GenreTagTitleStyle>
        {genreFiltered?.map((mediaGenre) =>
          <SelectOption key={mediaGenre}
                        value={mediaGenre ?? ''}
                        onClick={() => { onGenreClick(mediaGenre) }}
                        selected={isGenreSelected(mediaGenre)}/>
        )}
              <GenreTagTitleStyle>TAGS</GenreTagTitleStyle>
        {tagFiltered?.map((mediaTag) =>
        <SelectOption key={mediaTag?.name}
                      value={mediaTag?.name ?? ''}
                      onClick={() => { onTagClick(mediaTag?.name ?? '') }}
                      selected={isTagSelected(mediaTag?.name ?? '')}/>)}
      </GenreOrTagStyleList>
    : <></> }</div>
}
